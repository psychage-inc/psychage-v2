#!/bin/bash

# Test runner for Clarity Score Backend
# Runs all unit tests for shared modules

set -e  # Exit on error

echo "🧪 Running Clarity Score Backend Tests..."
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track test results
TESTS_PASSED=0
TESTS_FAILED=0

# Function to run a test file
run_test() {
  local test_file=$1
  local test_name=$(basename "$test_file" .test.ts)

  echo -e "${YELLOW}Running: ${test_name}${NC}"

  if deno test --allow-net --allow-env "$test_file"; then
    echo -e "${GREEN}✓ ${test_name} passed${NC}"
    ((TESTS_PASSED++))
  else
    echo -e "${RED}✗ ${test_name} failed${NC}"
    ((TESTS_FAILED++))
  fi

  echo ""
}

# Run all tests in _shared/__tests__/
echo "================================================"
echo "Unit Tests: Shared Modules"
echo "================================================"
echo ""

run_test "functions/_shared/__tests__/scoring.test.ts"
run_test "functions/_shared/__tests__/clinical-flags.test.ts"
run_test "functions/_shared/__tests__/crisis-detection.test.ts"

# Summary
echo "================================================"
echo "Test Summary"
echo "================================================"
echo -e "Passed: ${GREEN}${TESTS_PASSED}${NC}"
echo -e "Failed: ${RED}${TESTS_FAILED}${NC}"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
  echo -e "${GREEN}✓ All tests passed!${NC}"
  exit 0
else
  echo -e "${RED}✗ Some tests failed${NC}"
  exit 1
fi
