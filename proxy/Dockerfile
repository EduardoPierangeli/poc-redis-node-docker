FROM opentracing/nginx-opentracing:latest

RUN mkdir -p /etc/zipkin
COPY jaeger-config.json /etc/zipkin/jaeger-config.json

COPY nginx.conf /etc/nginx/nginx.conf