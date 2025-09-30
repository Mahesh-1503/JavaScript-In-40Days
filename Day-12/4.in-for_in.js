// for ... in

for (let key in profile) {
  console.log(key);
  console.log(profile[key]);
}

console.log(Object.keys(profile));

console.log(profile.salary); // undefined

console.log("salary" in profile);

if (!profile.salary) {
  console.log("The salary property doesn't exist");
}

console.log(profile.address.country); // India
profile.address.greeting();
console.log(profile.name); // "tapas"
console.log(profile.company); // "CreoWis"

profile.message();
