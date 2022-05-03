# cs546_group20_final_project

### Instruction for testing myCollection

* Run ```npm run seed ``` You should see a log message
```User this link to test myCollection: http://localhost:3000/myCollection/XXXX```
* Run ```npm run start ```
* Copy the above link in the log message to view the myCollection page for user
* You can also do "Cancel Collection" action or click "Back to Home" button to redirect to Home page.


### Instruction for testing user detail page

* Use same userId to pen user detail page ```http://localhost:3000/user/XXXX```


### Instruction from Guan for seed

#### 要使用seed.js 之前，要先注释掉几个地方。 
* 1.route comment.js里面 最上面的 router.get('/:id) 看上面的注释，在使用seed的时候需要注释掉。
* 2.还是 route comment.js 里面 最下面的 router.get('/:id) 看上面的注释，解除这里的注释， 包括下面的router.get('/) 也要解除注释
* 3.method 文件夹里面， comment.js  最下面的 get(id) 和那两个getall（）要取消注释，那两个getall（）可以只用一个，但两个都取消注释并没影响。
* 然后就可以 npm run seed 了， 在seed.js 里面也有几条注释，如果想要多几条数据可以取消注释，但注意我一直用默认的seed，所有注释掉的seed 有些缺少参数，你们需要用的话自己加。但是默认的seed是完全的一个数据库，包含了个个collection应该够用。
* 尽量别用我现有的method 或者router ，因为最后我都改了，有一些最后要删掉的。如果需要公用的，你们跟我说我告诉你们用哪个。