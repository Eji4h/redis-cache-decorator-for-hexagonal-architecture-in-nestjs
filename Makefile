define _script
cat <<EOF > .env
PNPM_PATH=$(pnpm store path)
EOF
endef
export script = $(value _script)

PNPM_PATH := $(shell pnpm store path)

init:; eval "$$script"
	docker compose -f compose.init.yaml up --build --remove-orphans
	sudo chown -R ${USER} node_modules ${PNPM_PATH}
	sudo chmod -R 755 node_modules ${PNPM_PATH}

clean:; eval "$$script"
	docker compose -f compose.init.yaml down
	sudo rm -rf node_modules dist

clean-pnpm-path:; eval "$$script"
	sudo rm -rf ${PNPM_PATH}/files

down-dev:; eval "$$script"
	docker compose down

restart-and-logs-dev:; eval "$$script"
	docker compose down && docker compose up -d && docker compose logs -f

logs-dev:; eval "$$script"
	docker compose logs -f
