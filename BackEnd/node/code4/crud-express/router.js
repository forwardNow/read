const express = require('express');
const Student = require('./student.js');

const router = express.Router();

// 首页
router.get('/', (req, res) => {
  res.send('index.html');
});

// 列表页
router.get('/students', (req, res) => {
  Student.find((err, data) => {
    if (err) {
      return res.status(500).send('server error');
    }
    return res.render('index.html', { students: data });
  });
});

// 添加页
router.get('/student/new', (req, res) => {
  res.render('new.html');
});

// 处理添加
router.post('/student/new', (req, res) => {
  // 1. 获取表单数据
  const { body: student } = req;

  student.gender = parseInt(student.gender, 10);
  student.age = parseInt(student.age, 10);

  // 2. 处理
  new Student(student).save(student, (err) => {
    if (err) {
      // 3. 响应
      res.status(500).send('server error');
      return;
    }
    // 3. 响应
    res.redirect('/students');
  });
});

// 编辑页
router.get('/student/edit', (req, res) => {
  let { query: { id } } = req;

  id = id.replace(/"/g, '');

  Student.findById(id, (err, student) => {
    if (err) {
      res.status(500).send('server error');
      return;
    }
    res.render('edit.html', { student });
  });
});


// 处理编辑
router.post('/student/edit', (req, res) => {
  // 1. 获取表单数据
  const { body: student } = req;

  student.id = student.id.replace(/"/g, '');
  student.gender = parseInt(student.gender, 10);
  student.age = parseInt(student.age, 10);

  // 2. 处理
  Student.findByIdAndUpdate(student.id, student, (err) => {
    if (err) {
      // 3. 响应
      res.status(500).send('server error');
      return;
    }
    // 3. 响应
    res.redirect('/students');
  });
});

// 处理删除
router.get('/student/delete', (req, res) => {
  // 1. 获取表单数据
  const { query: student } = req;

  student.id = student.id.replace(/"/g, '');

  // 2. 处理
  Student.findByIdAndDelete(student.id, (err) => {
    if (err) {
    // 3. 响应
      res.status(500).send('server error');
      return;
    }
    // 3. 响应
    res.redirect('/students');
  });
});

module.exports = router;
