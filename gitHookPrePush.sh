#!/bin/bash

# This hook will PREVENT a GIT push where ..
#   * The build is passing AND a commit message starts with WIP
#   * The build is failing AND a commit message does not start with WIP
#   * The build is failing AND the branch is master or develop

RED='\033[0;31m';
YELLOW='\033[0;33m';
GREEN='\033[0;32m';
NC='\033[0m'; # No color

echo;
echo -e "pre-push: Executing pre-push git hook";
echo -e "pre-push: Before pushing lets try building ..";
echo;

npm run build -s;
if [ $? -eq 0 ]; then
    build=true;
    echo;
    echo -e "pre-push: Build passed";
else
    build=false;
    echo;
    echo -e "pre-push: Build failed";
fi

remote="$1";
url="$2";
z40=0000000000000000000000000000000000000000;
wip=false;
branch=`git symbolic-ref --short HEAD`;
prevent=false;

while read local_ref local_sha remote_ref remote_sha; do
	if [ "$local_sha" = ${z40} ]; then
		# Handle delete
		:
	else
		if [ "$remote_sha" = ${z40} ]; then
			# New branch, examine all commits
			range="$local_sha";
		else
			# Update to existing branch, examine new commits
			range="$remote_sha..$local_sha";
		fi

		# Check for WIP commit
		commit=`git rev-list -n 1 --grep '^WIP' "$range"`;
		if [ -n "$commit" ]; then
			echo >&2 "pre-push: Found WIP commit";
		    wip=true;
		fi
	fi
done

echo -e "pre-push: SUMMARY: build=${build}, WIP=${wip}, branch=${branch}";

if [ "${build}" == "true" ] && [ "${wip}" == "true" ]; then
  echo -e "pre-push: ${RED}Push prevented .. The build is passing AND a commit message starts with WIP";
  echo -e "          TIP: Change your commit messages with ..";
  echo -e "          git commit --amend -m \"new message\" OR git rebase -i (then use reword (r))${NC}";
  prevent=true;
fi

if [ "${build}" == "false" ] && [ "${wip}" == "false" ]; then
  echo -e "pre-push: ${RED}Push prevented .. The build is failing AND a commit message does not start with WIP";
  echo -e "          TIP: Fix the build (preferred) OR change your commit messages with ..";
  echo -e "          git commit --amend -m \"new message\" OR git rebase -i (then use reword (r))${NC}";
  prevent=true;
fi

if [ "${build}" == "false" ] && [ "${branch}" == "master" ]; then
  echo -e "pre-push: ${RED}Push prevented .. The build is failing AND the branch is master${NC}";
  prevent=true;
fi

if [ "${build}" == "false" ] && [ "${branch}" == "develop" ]; then
  echo -e "pre-push: ${RED}Push prevented .. The build is failing AND the branch is develop${NC}";
  prevent=true;
fi

if [ "${prevent}" == "false" ] && [ "${wip}" == "true" ]; then
  echo -e "pre-push: ${YELLOW}Push permitted but it is against policy to push failing code - Please fix ASAP${NC}";
fi

if [ "${prevent}" == "false" ] && [ "${wip}" == "false" ]; then
  echo -e "pre-push: ${GREEN}Push permitted${NC}";
fi

test "${prevent}" == "false";
exitCode=$?;
exit ${exitCode};
