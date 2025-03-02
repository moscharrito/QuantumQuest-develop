FROM nginx:alpine

RUN apk add --no-cache python3 py3-pip bash wget && \
    wget -O /usr/local/bin/mailhog https://github.com/mailhog/MailHog/releases/download/v1.0.1/MailHog_linux_amd64 && \
    chmod +x /usr/local/bin/mailhog

WORKDIR /app
COPY requirements.txt .
RUN python3 -m venv venv && \
    . venv/bin/activate && \
    pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

COPY nginx.conf /etc/nginx/nginx.conf
COPY src/ /app

EXPOSE 80 9000 8025 1025

CMD ["sh", "-c", ". venv/bin/activate && python3 -m singhit_app.api.server & mailhog & nginx -g 'daemon off;'"]