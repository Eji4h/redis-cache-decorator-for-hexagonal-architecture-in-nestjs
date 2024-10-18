FROM node:22-alpine AS build
WORKDIR /app
RUN npm i -g husky pnpm@9
COPY pnpm-lock.yaml package.json ./
RUN pnpm i --frozen-lockfile
COPY . .
RUN pnpm build && \
	pnpm prune --prod

FROM gcr.io/distroless/nodejs22-debian12:nonroot
WORKDIR /app
USER nonroot
COPY --from=build --chown=nonroot:nonroot /app/node_modules ./node_modules
COPY --from=build --chown=nonroot:nonroot /app/dist/ ./dist/
EXPOSE 3000
ENV NODE_PORT=3000
ENV NODE_ENV=production
CMD [ "dist/main.js" ]
