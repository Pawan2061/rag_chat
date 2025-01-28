FROM node:20-alpine as base
RUN npm install -g pnpm
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . ./
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "dev"]
