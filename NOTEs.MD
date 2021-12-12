# TODO

- create notes file with what todo -> DONE
- Create test.http using rest client to check routes response -> DONE
- read JSON file ->
- install jest and write a very basic test to test as we go -> DONE

You will need to write some code to:

1. Read the JSON file - `rules.json`
2. Improve the middleware function `checkAgainstRules` to check against the rules from step 1
3. (optional) Add some basic unit testing (1 positive and 1 negative case)

Ideally, the middleware will need to check for the following:

1. All required parameters are present
2. All parameter data types are correct (hint: type casting?)
3. No extraneous parameters are present

---

    // check if body is defined && check if querystring is defined
    // if no body then throw 400 + "bad request body required"
    // if no query sting then throw 400 + "bad request query string required"
    // validate path name is same as key in path -> req.route.path
    // check if Object.hasOwnProert(parameters)
    // check path that both paths matc use filter to get correct path info
    // if rules path has a required parameter then check that body or QueryString is not undefine and then proceed with validation
    // if has params check using typeof
    // if object get key from rules and check keys in body

    TAKE AN OOP approach using prototypes

---

Cord tech test - write a json schema validation middleware with tests

You can use json schema npm, as an example take a read of it and see how they do it.

Can use prototypes or keep it to just functions.

With test use mocks etc to show what its it and create an object that holds all the http error messages just to make it easier…

Errors with most probly generated dynamically

- How to handle dynamic error generation?
- How to handle json node searching?? Search algorithms or linked lists or something
- How to match **req.method** with the key of the Schema ?
- Handle required fields separately then check none required

---

- if no rules for request than valid -> DONE
- if no params in rules than validate -> DONE
- c
