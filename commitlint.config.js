module.exports = {
  ignores: [commit => commit.includes("init")],
  extends: ["@commitlint/config-conventional"],
  rules: {
    "body-leading-blank": [2, "always"],
    "footer-leading-blank": [1, "always"],
    "header-max-length": [2, "always", 108],
    "subject-empty": [2, "never"],
    "type-empty": [2, "never"],
    "type-enum": [
      2,
      "always",
      [
        "bug", // 此项特别针对bug号，用于向测试反馈bug列表的bug修改情况
        "feat", // 新功能（feature）
        "fix", // 修补bug
        "perf", // 性能提高
        "style", // 格式（不影响代码运行的变动）
        "docs", // 文档（documentation）
        "test", // 增加测试
        "refactor", // 重构（即不是新增功能，也不是修改bug的代码变动）
        "build",
        "ci",
        "chore", // 构建过程或辅助工具的变动
        "revert", // feat(pencil): add ‘graphiteWidth’ option (撤销之前的commit)
        "wip",
        "workflow",
        "types",
        "release"
      ]
    ]
  }
};
