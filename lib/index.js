module.exports = function (source) {
  const regex = /\/\/\s*#(ifdef|ifndef|endif)\s*([^\s]*)?/;

  let stack = [];
  let output = "";
  let delArr = [];
  const env = process.env.UNI_PLATFORM || this.query?.env || "h5";

  // 解析条件表达式，例如 "MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || APP-VUE"
  function evaluateCondition(condition) {
    const conditions = condition.split(/\s*\|\|\s*/);
    return conditions.some((cond) => cond.toLowerCase() == env.toLowerCase());
  }
  const lines = source.split("\n");
  lines.forEach((line, index) => {
    const match = line.match(regex);
    if (match) {
      const directive = match[1];
      const condition = match[2];
      if (directive === "ifdef" || directive === "ifndef") {
        stack.push({ directive, condition, start: index, skip: directive === "ifdef" ? !evaluateCondition(condition) : evaluateCondition(condition) });
      } else if (directive === "endif") {
        const last = stack.pop();
        if (last && last.skip) {
          last.end = index;
          delArr.push(last);
        }
      }
    }
  });
  // 删除条件编译代码
  delArr.forEach((item) => {
    if (item.end > item.start) {
      for (let i = item.start; i <= item.end; i++) {
        lines[i] = "";
      }
    }
  });

  output = lines.filter((item) => item !== "").join("\n");

  return output;
};
