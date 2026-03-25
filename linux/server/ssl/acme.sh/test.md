

acme.sh --install-cert -d "*.moshuapp.com" \
--key-file       /etc/nginx/ssl/*.moshuapp.com.key \
--fullchain-file /etc/nginx/ssl/*.moshuapp.com.crt \
--reloadcmd      "systemctl reload nginx"


acme.sh --install-cert -d "mp-api.moshuapp.com" \
--key-file       /etc/nginx/ssl/mp-api.moshuapp.com.key \
--fullchain-file /etc/nginx/ssl/mp-api.moshuapp.com.crt \
--reloadcmd      "systemctl reload nginx"


acme.sh --issue --nginx -d expert-at-the-card-table.moshuapp.com

acme.sh --issue -d expert-at-the-card-table.moshuapp.com  --nginx /www/vhost/expert-at-the-card-table.conf


/etc/nginx/ssl/expert-at-the-card-table.moshuapp.com.crt

acme.sh --issue -d h5.moshuapp.com  --nginx /usr/local/nginx/conf/nginx.conf


acme.sh --install-cert -d "h5.moshuapp.com" \
--key-file       /etc/nginx/ssl/h5.moshuapp.com.key \
--fullchain-file /etc/nginx/ssl/h5.moshuapp.com.crt \
--reloadcmd      "systemctl reload nginx"



acme.sh --issue -d www.moshuapp.com  --nginx /usr/local/nginx/conf/nginx.conf

acme.sh --install-cert -d "www.moshuapp.com" \
--key-file       /etc/nginx/ssl/www.moshuapp.com.key \
--fullchain-file /etc/nginx/ssl/www.moshuapp.com.crt \
--reloadcmd      "systemctl reload nginx"



acme.sh --install-cert -d "pwa.moshuapp.com" \
--key-file       /etc/nginx/ssl/pwa.moshuapp.com.key \
--fullchain-file /etc/nginx/ssl/pwa.moshuapp.com.crt \
--reloadcmd      "systemctl reload nginx"


acme.sh --issue --dns -d *.moshuapp.com  --nginx /usr/local/nginx/conf/nginx.conf


acme.sh --install-cert -d "*.moshuapp.com" \
--key-file       /etc/nginx/ssl/moshuapp.com.key \
--fullchain-file /etc/nginx/ssl/moshuapp.com.crt \
--reloadcmd      "systemctl reload nginx"
