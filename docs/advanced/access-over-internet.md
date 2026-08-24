---
title: Accessing WLED over Internet
hide:
  # - navigation
  # - toc
---

Control your LEDs from anywhere. Pick a route below: Tailscale is the easiest, Cloudflare Tunnel gives you a login-protected public URL, HomeKit puts WLED in the Apple Home app, and Caddy, nginx, or Traefik work if you already run a reverse proxy at home.

Already controlling WLED through [Home Assistant](https://www.home-assistant.io/integrations/wled/)? If you can reach Home Assistant remotely, you have secure remote control and don't need anything on this page.

!!! warning "Never port forward WLED"
    WLED has no login on its control interface and no HTTPS. Port forwarding it to the internet gives anyone full control of the device, including flashing new firmware. Every option below adds that missing security layer in front.

=== "Tailscale"

    [Tailscale](https://tailscale.com/) builds a private WireGuard network between your devices, so nothing is exposed to the public internet and you don't need to open ports or manage a domain and certificates. The free plan is enough for this.

    WLED itself can't run Tailscale, so you need one always-on device at home (a Raspberry Pi, NAS, or home server) to act as a [subnet router](https://tailscale.com/kb/1019/subnets) that forwards traffic to your LAN. A Home Assistant box works too: its Tailscale add-on can advertise your LAN, and Tailscale has a [video walkthrough](https://www.youtube.com/watch?v=fMR8uvNIilI) of that setup.

    1. Create a Tailscale account and install the app on your phone or laptop.
    2. Install Tailscale on the always-on device at home and sign it in with `sudo tailscale up`.
    3. On that device, advertise the route to your WLED devices. A single address is enough for one controller, and safer than opening the whole LAN:

        ```sh
        sudo tailscale set --advertise-routes=192.168.1.50/32
        ```

        Use your own WLED IP, or a subnet like `192.168.1.0/24` if you have several devices to reach. On Linux you also need to enable IP forwarding, see the [subnet router guide](https://tailscale.com/kb/1019/subnets).

    4. In the [Tailscale admin console](https://login.tailscale.com/admin/machines), approve the advertised route on that machine.

    With Tailscale connected on your phone, open WLED's LAN IP in the browser or add it in the WLED app. Use the IP address, not `wled.local`, because mDNS names don't resolve across the tunnel. WLED also never gets a `.ts.net` name of its own, since it isn't running Tailscale. On a Linux client, run `sudo tailscale set --accept-routes` first; phones, Macs and Windows pick up the route on their own.

    If you'd rather not rely on a third party, a plain [WireGuard](https://www.wireguard.com/) tunnel to your router or a self-hosted [Headscale](https://headscale.net/) control server gets you the same result with more setup.

=== "Cloudflare Tunnel"

    [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/) is a good option if you want to reach WLED from a device where you can't run a VPN client, or share access with someone else. A small daemon (`cloudflared`) on a machine in your LAN makes an outbound connection to Cloudflare, so no ports are opened on your router. You need a domain on Cloudflare (the free plan works).

    !!! warning "The tunnel alone is not enough"
        A tunnel without access control is just port forwarding with extra steps. You **must** put [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/policies/access/) in front of the tunnel so only you can log in.

    1. In the Cloudflare dashboard, go to **Networking > Tunnels** and create a tunnel. Install `cloudflared` on an always-on machine in your LAN using the command the dashboard gives you.
    2. Under **Zero Trust**, create an Access application for the hostname you plan to use, for example `wled.mydomain.example`, with a policy that only allows your own login, such as email one-time PIN. Do this before the next step, or WLED is briefly reachable by anyone.
    3. Back in the tunnel, add that hostname as a public hostname pointing to `http://<WLED-IP>`.

    Now `https://wled.mydomain.example` asks for your login first and only then shows WLED.

=== "HomeKit"

    If you're in the Apple ecosystem, you can put WLED in the Home app and let Apple handle the remote connection. You need a home hub (an Apple TV or HomePod) at home; the hub relays remote control through Apple's servers, so there's nothing to expose or configure, and Siri works too.

    The Home app's light controls cover power, brightness, and color. For the full WLED interface, use one of the other tabs.

    WLED doesn't speak HomeKit natively, so a bridge on your network translates:

    - If you run Home Assistant, enable the [HomeKit Bridge](https://www.home-assistant.io/integrations/homekit/) integration, expose the WLED light entity, and scan the pairing QR code with the Home app.
    - Without Home Assistant, run [Homebridge](https://homebridge.io/) on a Raspberry Pi or home server with a WLED plugin such as [homebridge-simple-wled](https://www.npmjs.com/package/homebridge-simple-wled), which can also expose chosen effects and presets as HomeKit switches.

=== "Caddy"

    This assumes an existing [Caddy](https://caddyserver.com/) server in your LAN and a domain pointed at your home IP (a free dynamic DNS name works). The proxy must require a login and serve HTTPS only; Caddy does the HTTPS part by default and obtains and renews the Let's Encrypt certificate automatically.

    Generate a password hash with `caddy hash-password`, put it in place of `PASSWORDHASH` in your `Caddyfile` (on Caddy older than 2.8, the directive is spelled `basicauth`):

    ```caddyfile
    wled.mydomain.example {
        basic_auth {
            yourusername PASSWORDHASH
        }
        reverse_proxy 192.168.1.50
    }
    ```

    Replace `192.168.1.50` with the IP or local hostname of your WLED device. Port forward TCP 80 and 443 from your router to the Caddy host so certificate issuing works.

=== "nginx"

    This assumes an existing [nginx](https://nginx.org/) server in your LAN, a domain pointed at your home IP (a free dynamic DNS name works), and TCP 443 forwarded to it. The proxy must require a login and serve HTTPS only. nginx doesn't manage certificates itself, so run [Certbot](https://certbot.eff.org/) before adding this server block; nginx won't start while the certificate paths point at nothing. Certbot's default challenge also needs TCP 80 forwarded.

    Create the password file with `htpasswd -c /etc/nginx/.htpasswd yourusername`, then:

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

    This assumes an existing [Traefik](https://doc.traefik.io/traefik/) instance in your LAN, a domain pointed at your home IP (a free dynamic DNS name works), TCP 443 forwarded to it, and a `letsencrypt` [certificate resolver](https://doc.traefik.io/traefik/https/acme/) configured. The proxy must require a login and serve HTTPS only.

    Generate the password hash with `htpasswd -nb yourusername mypassword`, then add this dynamic configuration in a file your [file provider](https://doc.traefik.io/traefik/providers/file/) watches:

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

!!! tip "Enable the OTA lock"
    Whichever route you choose, also enable [OTA Lock](/advanced/ota-lock) and change its default passphrase `wledota`, so nobody who gets past the first layer can push new firmware over Wi-Fi.
