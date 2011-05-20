NODE = node
TEST = expresso
TESTS ?= test/*.test.js

test:
	@NODE_ENV=test $(TEST) -I lib $(TEST_FLAGS) $(TESTS)

test-cov:
	@$(MAKE) test TEST_FLAGS="--cov"

.PHONY: test test-cov
