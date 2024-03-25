FROM node:20.11-alpine3.18
WORKDIR /app

# Declare environment variable defaults
ENV API_PORT=3000
ENV DATABASE_URL=
ENV NODE_ENV=development
ENV JWT_EXPIRATION=15m
ENV JWT_SECRET=WeAreTheChampionsNoTimeForLosers
ENV SMTP_HOST=
ENV SMTP_PORT=465
ENV SMTP_USER=
ENV SMTP_PASS=

# COPY required local files
COPY ./package*.json ./
COPY ./tsconfig.json ./
COPY ./prisma ./prisma
COPY ./src ./src

# Install or Build Dependencies
RUN npm install -g pnpm
RUN npm install -g @nestjs/cli
RUN pnpm install
RUN pnpm run prisma:generate
RUN pnpm run build

# CLEANUP
RUN rm -rf ./src

EXPOSE 3000

CMD ["node", "dist/src/main.js"]