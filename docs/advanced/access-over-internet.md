---
title: Accessing WLED over Internet
hide:
  # - navigation
  # - toc
---

WLED has no authentication and no HTTPS. Anyone who can reach it can change your configuration or flash new firmware. That means you can't expose it to the internet directly, but you can reach it safely through a VPN, a tunnel, or an authenticated reverse proxy. This page covers all three, easiest first.

!!! warning "Never port forward WLED"
    Under no circumstances port forward a WLED instance to the public internet.
    WLED does not support HTTPS or authentication, so anyone who finds it has full control of the device.

!!! tip "Already running Home Assistant?"
    If you control WLED through [Home Assistant](https://www.home-assistant.io/integrations/wled/) and Home Assistant is reachable remotely, you already have secure remote control and don't need anything on this page.

## Recommended: Tailscale

[Tailscale](https://tailscale.com/) is the easiest way to reach WLED from anywhere. It builds a private WireGuard network between your devices, so nothing is exposed to the public internet and you don't need to open ports or manage a domain and certificates. The free plan is enough for this.

WLED itself can't run Tailscale, so you need one always-on device at home (a Raspberry Pi, NAS, or home server) to act as a [subnet router](https://tailscale.com/kb/1019/subnets) that forwards traffic to your LAN.

1. Create a Tailscale account and install the app on your phone or laptop.
2. Install Tailscale on the always-on device at home.
3. On that device, advertise your LAN subnet (adjust to match your network):

    ```
    sudo tailscale up --advertise-routes=192.168.1.0/24
    ```

    On Linux you also need to enable IP forwarding, see the [subnet router guide](https://tailscale.com/kb/1019/subnets).

4. In the [Tailscale admin console](https://login.tailscale.com/admin/machines), approve the advertised route on that machine.

That's it. With Tailscale connected on your phone, open WLED's normal LAN IP in the browser or add it in the WLED app, exactly as if you were home.

If you'd rather not rely on a third party, a plain [WireGuard](https://www.wireguard.com/) tunnel to your router or a self-hosted [Headscale](https://headscale.net/) control server gets you the same result with more setup.

## Cloudflare Tunnel

[Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/) is a good option if you want to reach WLED from a device where you can't run a VPN client, or share access with someone else. A small daemon (`cloudflared`) on a machine in your LAN makes an outbound connection to Cloudflare, so no ports are opened on your router. You need a domain on Cloudflare (the free plan works).

!!! warning "The tunnel alone is not enough"
    A tunnel without access control is just port forwarding with extra steps. You **must** put [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/policies/access/) in front of the tunnel so only you can log in.

1. In the Cloudflare dashboard, go to Zero Trust and create a tunnel. Install `cloudflared` on an always-on machine in your LAN using the command the dashboard gives you.
2. Add a public hostname for the tunnel, for example `wled.mydomain.example`, pointing to `http://<WLED-IP>`.
3. In Zero Trust, create an Access application for that hostname with a policy that only allows your own login, for example email one-time PIN.

Now `https://wled.mydomain.example` asks for your login first and only then shows WLED.

## Advanced: reverse proxy

If you already run a public-facing reverse proxy, you can publish WLED through it. Two requirements are non-negotiable:

- The proxy **must implement access control**, so only trusted users reach WLED.
- The proxy **must terminate TLS** and only accept HTTPS. Access control over plain HTTP leaks your credentials.

The proxy can't run on the WLED device itself. You need a server in your LAN:

```
[Public Internet]
   |
[Router]
   |
[Reverse Proxy]
   |
[WLED]
```

The general recipe is the same for every proxy: register a domain name (a dynamic DNS name works), get a Let's Encrypt certificate with automatic renewal, port forward TCP 443 from your router to the proxy, and configure an authenticated virtual host that proxies to WLED's LAN IP. WLED's live view uses a WebSocket, so the proxy must pass WebSocket upgrades through.

=== "Caddy"

    Caddy obtains and renews the Let's Encrypt certificate automatically, serves HTTPS only by default, and proxies WebSockets without extra configuration.

    Generate a password hash with `caddy hash-password`, then in your `Caddyfile`:

    ```
    wled.mydomain.example {
        basic_auth {
            yourusername PASSWORDHASH
        }
        reverse_proxy 192.168.1.50
    }
    ```

    Replace `192.168.1.50` with the IP or local hostname of your WLED device. Caddy needs ports 80 and 443 forwarded for certificate issuing.

=== "nginx"

    nginx doesn't manage certificates itself, use [Certbot](https://certbot.eff.org/) to obtain and renew the Let's Encrypt certificate. Create the password file with `htpasswd -c /etc/nginx/.htpasswd yourusername`.

    ```nginx
    server {
        listen 443 ssl;
        server_name wled.mydomain.example;

        ssl_certificate     /etc/letsencrypt/live/wled.mydomain.example/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/wled.mydomain.example/privkey.pem;

        auth_basic           "WLED";
        auth_basic_user_file /etc/nginx/.htpasswd;

        location / {
            proxy_pass http://192.168.1.50;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host $host;
        }
    }
    ```

    The `Upgrade` and `Connection` headers are required for WLED's live view WebSocket. Don't add a `listen 80` server block that serves WLED; if you want one, only use it to redirect to HTTPS.

=== "Traefik"

    With a `letsencrypt` [certificate resolver](https://doc.traefik.io/traefik/https/acme/) configured in your static configuration, add this dynamic configuration. Generate the password hash with `htpasswd -nb yourusername mypassword`.

    ```yaml
    http:
      routers:
        wled:
          rule: "Host(`wled.mydomain.example`)"
          entryPoints:
            - websecure
          middlewares:
            - wled-auth
          service: wled
          tls:
            certResolver: letsencrypt

      middlewares:
        wled-auth:
          basicAuth:
            users:
              - "yourusername:PASSWORDHASH"

      services:
        wled:
          loadBalancer:
            servers:
              - url: "http://192.168.1.50"
    ```

Whichever option you choose, also enable the [OTA lock password](/advanced/ota-lock) so the firmware can't be replaced even by someone who gets past the first layer.
