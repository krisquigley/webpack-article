FROM ruby:2.4-slim

# Install basic packages
RUN apt-get update && apt-get install -y curl apt-transport-https libsqlite3-dev
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get update && apt-get install -y build-essential wget git yarn

RUN yarn global add webpack

# Set up app
ENV app /app
RUN mkdir $app
WORKDIR $app

# Set up gems
ENV BUNDLE_PATH /gems

ADD . $app