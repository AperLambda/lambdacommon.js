import {Identifier, TestUnit} from '../lib/lambdacommon.mjs'

console.log('Testing λcommon.js...');
const ID_TEST = new Identifier("lambdacommon", "test")
let result = new TestUnit()
  .section("lambdacommon:identifier", section => {
    section.add("Identifier(String identifier)", () => new Identifier("lambdacommon:identifier").to_string(), "lambdacommon:identifier");
    section.add("Identifier(String identifier, String sub_path)", 
      () => new Identifier("lambdacommon:identifier", "yay").to_string(), "lambdacommon:identifier/yay");
    section.add("Identifier.sub(String path)", () => ID_TEST.sub("yay").to_string(), "lambdacommon:test/yay");
    section.add("Identifier.equals(other)", () => ID_TEST.equals("lambdacommon:test"), true);
    section.add("Identifier.equals(other)", () => ID_TEST.equals(ID_TEST), true);
    section.add("Identifier.equals(other)", () => ID_TEST.equals(new Identifier("lambdacommon:identifier")), false);
  }).test();

if (!result)
  process.exit(1);
