import { Selector } from "testcafe";

fixture("Basic AIG Test").page("http://localhost:5000/");

test("Find AIG", async t => {
  const aboutLink = Selector("a").withText("About");
  const firstFounder = Selector("b").withText("Ben Halpern");
  const secondFounder = Selector("b").withText("Jess Lee");
  const thirdFounder = Selector("#app > div > div > table > tbody > tr:nth-child(4)");

  const citySelect = Selector(".gender");
  const cityOption = citySelect.find("option");

  const ageInput = Selector(".ageField");
  const amountInput = Selector(".amount");
  const submit = Selector(".submit");
  
  

  await t
    // .click('select')
    // .click(Selector('option').filter('[value="Male"]'))
     .click(citySelect)
        .click(cityOption.withText('Male'))

 
     .typeText(ageInput, '50')
     .typeText(amountInput, '15000')
   
     
    .click(submit)
 
    .expect(thirdFounder.innerText).eql('Price:\t$76.89');
     
 
});
test("Find Philly", async t => {
  const aboutLink = Selector("a").withText("About");
  const firstFounder = Selector("b").withText("Ben Halpern");
  const secondFounder = Selector("b").withText("Jess Lee");
  const thirdFounder = Selector(
    "#app > div > div > table > tbody > tr:nth-child(4)"
  );

  const citySelect = Selector("select");
  const smoke = Selector(".smoke");

  const issued = Selector(".issued");

  

  const cityOption = citySelect.find("option");

  const ageInput = Selector(".ageField");
  const amountInput = Selector(".amount");
  const submit = Selector(".submit");

  await t
    // .click('select')
    // .click(Selector('option').filter('[value="Male"]'))
    .click(citySelect)
    .click(cityOption.withText("Male"))

    .wait(1000)
.click(smoke)
    .click(smoke.withText("Smoker"))


    .click(issued)
    .click(issued.withText("Standard"))


    .typeText(ageInput, "50")
    .typeText(amountInput, "10000")
    .wait(3000)

    .click(submit)
    .wait(3000)
    .expect(thirdFounder.innerText)
    .eql("Price:\t$51.92");
});