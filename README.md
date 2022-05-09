# cs546_group20_final_project


## Core Feature Tests

Run ``` npm run start ``` to start the website

Visit http://localhost:3000

* You will view the main page, it includes instruction, news and about us.

* You can click nav bar to log in or sign up account

* Make sure you login your account. You will be able to visit user detail page by clicking top right "Home" button

* You will be able to view user detail, my cars, favrite areas in user detail page

* You will be able to add new parking lot in this page using "View/Add New Parking Lot" button

* After parking lot added, you can use the same button to view the parking lot you added.

* And then you are able to view the parking lot detail by clicking the "view" button.

* In the parking lot page, you can add the parking lot to my collection.

* You can also add comment for parking lot.

## Instruction for git rebase and git merge

Why ```git rebase``` is required?

This helps making sure team member fixing conflicts and having code fully tested in feature branch. So dev branch can be ready for anyone developing their feature and they do not need to worry about any corrputed code imported to their feature branch and impact their work.

* Always develop you code in feature branch

You can create feature branch from dev branch using below commands:
```
# Checkout dev branch
git checkout dev
# Create new feature branch named <newFeature>, replace <newFeature> with actual feature name
git chekout -b feature/<newFeature>
```

* After development completed and fully tested, rebase code from dev

```
# Add the files or changes to the repository. 
git add -A

# Enter git status to see the changes to be committed.
git status

# Commit new files/changes to the local repository
git commit -m '<commit_message>'

# Switch to dev branch and pull latest changes
git checkout dev
git pull origin

# Switch back to feature branch
git chekout feature/<newFeature>

# Rebase dev code to feature branch
git rebase dev

# Fix conflicts in Visual Studio, after conflicts fixed(If yes, then you need a new commit) or there is no conflict, fully test your code, then switch back to dev and merge the code to dev
git checkout dev
git merge feature/<newFeature>
git push origin

```

## Simple Instructions for git


```

git add -A

git commit -m "<message>"

git pull origin

## if there is conflicts in your branch, resovle conflicts
## And then redo git add and git commit

git push

```