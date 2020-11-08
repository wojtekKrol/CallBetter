#!/bin/bash
ROOT_DIR=$(git rev-parse --show-toplevel)
export NODE_OPTIONS=--max_old_space_size=4096
# shellcheck disable=SC2164
pushd ${ROOT_DIR} > /dev/null
echo " "
EXIT_CODE=0

if [[ "$CI" ]]; then
    if [[ "$1" != "" ]]; then
        eslint $1 . && echo "=>  eslint done 👍"
    else
        eslint . && echo "=>  eslint done 👍"
    fi
    # shellcheck disable=SC2164
    popd > /dev/null
    exit $?
fi

LIST=`git diff --name-only --no-prefix --diff-filter=AMR HEAD -- '*.tsx' '*.ts'`


if [[ "$1" == "--all" ]]; then
     eslint "$ROOT_DIR" && echo "=>  Project code looks awesome 👍"
elif [[ "$LIST" ]]; then
    if [[ "$1" != "" ]]; then
        eslint $1 $LIST && echo "=>     Your code looks pretty 👍"
    else
        eslint $LIST && echo "=>        Your code looks pretty 👍"
    fi
    EXIT_CODE=$?
else
  echo "=>  No files for checking by eslint 👀"
fi
echo " "
# shellcheck disable=SC2164
popd > /dev/null
exit ${EXIT_CODE}
