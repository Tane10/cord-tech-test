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
