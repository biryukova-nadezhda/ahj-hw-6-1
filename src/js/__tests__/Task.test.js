import Task from '../Task';

test('shoud create a new object Task', () => {
  const expected = {
    content: 'New Object',
  };

  const result = new Task('New Object');
  expect(result).toEqual(expected);
});
