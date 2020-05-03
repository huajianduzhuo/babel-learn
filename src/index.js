let str1 = 'abcdefg'
str1.endsWith('efg')

function say() {
  console.log(this.name)
}
// bind this
let person = {
  name: '白宇'
}
person::say()
/**
 * stage 4 proposal
 */
// matchAll
let reg2 = /by/g
let str2 = 'hibynihaoby'
let res2 = str2.matchAll(reg2)
for (const value of res2) {
  console.log(value)
}
/**
 * stage 3 proposal
 */
// replaceAll
let reg3 = /by/g
let str3 = 'hibynihaoby'
let res3 = str3.replaceAll(reg3, 'baiyu')
console.log(res3)