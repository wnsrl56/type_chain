interface Human {
  name: String;
  age: Number;
  gender: String;
  wear: Wears;
}

class Wears {
  public head: String;
  public body: String;
  public foot: String;
  constructor(head: String, body: String, foot: String) {
    this.head = head;
    this.body = body;
    this.foot = foot;
  }
}

const person = {
  name: 'jun',
  age: 20,
  gender: 'male',
  wear: new Wears('iron helmat', 'leather armor', 'iron boots')
};

const sayHi = (person: Human): String => {
  const { name, age, gender, wear } = person;
  const { head, body, foot } = wear;
  return `my name is ${name}, age is ${age} my gender is ${gender}\nmy wearing ${head}, ${body}, ${foot}`;
};

console.log(sayHi(person));
