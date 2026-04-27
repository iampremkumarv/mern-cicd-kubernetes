FROM jenkins/jenkins:lts

USER root

RUN apt-get update && apt-get install -y \
    curl \
    git \
    unzip \
    ca-certificates

# Install Docker CLI
RUN curl -fsSL https://get.docker.com | sh

# Install kubectl
RUN curl -LO "https://dl.k8s.io/release/v1.35.1/bin/linux/amd64/kubectl" && \
    install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl && \
    rm kubectl

USER jenkins