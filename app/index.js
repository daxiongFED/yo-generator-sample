// 此文件作为 Generator 的核心入口
// 需要导出一个继承自 Yeoman Generator 的类型
// Yeoman Generator 在工作时会自动调用我们在此类型中定义的一些生命周期方法
// 我们在这些方法中可以通过调用父类提供的一些工具方法去实现一些功能（比如文件写入）

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    // Yeoman 在询问用户环节会自动调用此方法
    // 在此方法中可以调用父类的 prompt() 方法发出对用户的命令行询问
    return this.prompt([
      {
        type: 'input', // 用户输入方式
        name: 'name', // 得到结果的键
        message: 'Your project name', // 给用户的问题
        default: this.appname, // appname 为项目生成的目录名称，作为 name 的默认值
      }
    ])
      .then(answers => {
        // answers => { name: 'user input value'}
        this.answers = answers;
      })
  };
  writing() {
    // Yeoman 自动在生成文件阶段调用此方法

    // 我们在这里尝试往项目目录写入文件
    // this.fs.write( // this.fs 是 yeoman-generator 高度封装的 file system，比 node 的更强大
    //   this.destinationPath('temp.txt'), // this.destinationPath 命令执行时的目录
    //   Math.random().toString(),
    // )

    // 通过模板方式写入文件到目标目录
    const tmpl = this.templatePath('foo.txt'); // 模板文件路径
    const output = this.destinationPath('foo.txt'); // 输出目标路径，this.destinationPath 命令执行时的目录
    const context = { title: this.answers.name, success: true }; // 模板数据上下文
    this.fs.copyTpl(tmpl, output, context);
  }
}