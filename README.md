# cs546_group20_final_project

### Instruction for testing myCollection

* Run ```npm run seed ``` You should see a log message
```User this link to test myCollection: http://localhost:3000/myCollection/XXXX```
* Run ```npm run start ```
* Copy the above link in the log message to view the myCollection page for user
* You can also do "Cancel Collection" action or click "Back to Home" button to redirect to Home page.

### Instruction for testing user detail page including myArea

* Use same userId to open user detail page ```http://localhost:3000/user/XXXX```
* You will be able to view myArea in user page

### Instruction for testing my parking lot page which shows all parkign lots uploaded by this user

* User this link to test myParkingLots page:  ```http://localhost:3000/myParkingLots/XXXX```
* You can click "View" button to view parking lot with the parkinglot ID
* You can navigate to this page from user detail page's "Add New Parking Lot" button


### Instruction for git rebase and git merge

Why ```git rebase``` is required?

This helps making sure alway team member fixing conflicts and having code fully tested in feature branch. So dev branch can be ready for anyone developing their feature and they do not need to worry about any corrputed code imported to their feature branch and impact their work.

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

### Instruction from Guan for seed

#### 要使用seed.js 之前，要先注释掉几个地方。 
* 1.route comment.js里面 最上面的 router.get('/:id) 看上面的注释，在使用seed的时候需要注释掉。
* 2.还是 route comment.js 里面 最下面的 router.get('/:id) 看上面的注释，解除这里的注释， 包括下面的router.get('/) 也要解除注释
* 3.method 文件夹里面， comment.js  最下面的 get(id) 和那两个getall（）要取消注释，那两个getall（）可以只用一个，但两个都取消注释并没影响。
* 然后就可以 npm run seed 了， 在seed.js 里面也有几条注释，如果想要多几条数据可以取消注释，但注意我一直用默认的seed，所有注释掉的seed 有些缺少参数，你们需要用的话自己加。但是默认的seed是完全的一个数据库，包含了个个collection应该够用。
* 尽量别用我现有的method 或者router ，因为最后我都改了，有一些最后要删掉的。如果需要公用的，你们跟我说我告诉你们用哪个。