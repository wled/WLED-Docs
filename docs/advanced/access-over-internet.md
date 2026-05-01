---
title: Accessing WLED over Internet
hide:
  # - navigation
  # - toc
---

WLED exposed to Internet safely with the help of a reverse proxy setup.
This document describes the steps needed.

!!! warning "Port Forwarding"
    Under no circumstances port forward WLED instance to the public internet.
    WLED does not support HTTPS or authentication, leading to a fundamentally insecure setup.

!!! tip "Consider VPN Tunneling"
    If you only need access from a single device, such as your phone,
    consider a point-to-point VPN tunnel instead. Configuring a tunnel
    may require less configuration and maintenance than a HTTPS reverse proxy.

# Reverse proxy requirements

WLED does not implement access control, allowing anyone able to connect to it change configuration or even update firmware.
For a safe access, **the reverse proxy MUST implement access control** to only allow trusted users to access WLED.

Secure access control cannot be implemented over insecure connection. **The reverse proxy MUST implement TLS termination**, only allowing access over HTTPS.

Reverse proxy cannot run on the WLED device.
You need a server in your local network to perform the encryption and proxying.

# Example

Assuming the following network setup, using Caddy as a reverse proxy:

```
[Public Internet]
   |
[Router]
   |
[Reverse Proxy]
   |
[WLED]
```

First, register a domain name. In this example, we assume the name "mydomain.example".
A domain name is commonly a requirement for a HTTP certificate.
You can use a dynamic dns provider for a free domain.

Next, generate a HTTPs certificate for your domain.
For the free Let's Encrypt certificates, configure necessary the automation for refreshing the certificate automatically.
In this example, we are using Caddy which handles this automatically.

We then expose the HTTPS port of the reverse proxy to public internet.
In your network router, port forward port TCP 443 into the Reverse Proxy.
In this example, we are using Caddy which only requires port 443 to complete the Let's Encrypt challenge for automatic certificate issuing.
With other software, you may need to also open insecure HTTP port 80.

Finally, in Caddyfile, configure the reverse proxy and authentication
Note that Caddy uses HTTPS by default.
With other software, we may need to disable access over the unsafe HTTP.

```
mydomain.example {
  handle /wled/* {
    # Create username and password. Password can be with `caddy hash-password --plaintext mypass`
    basicauth {
        yourusername PASSWORDHASH
    }
    uri strip_prefix /wled
    reverse_proxy wled-wled-a.lan # IP address or the network local name of the WLED device
  }
}
```

Now `https://mydomain.example/wled/` exposes WLED to the public internet using secure HTTPS and password authentication.

For additional securty, consider enabling [OTA lock password](/advanced/ota-lock).
