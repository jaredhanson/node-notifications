NODE = node
TEST = ./node_modules/.bin/expresso
TESTS ?= test/*.test.js

test:
	@NODE_ENV=test NODE_PATH=lib $(TEST) $(TEST_FLAGS) $(TESTS)

test-cov:
	@$(MAKE) test TEST_FLAGS="--cov"

.PHONY: test test-cov
