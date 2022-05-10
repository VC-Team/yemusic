export function abemClasses(rootClassName: string, ...modifiers: (string | false | undefined)[]): string {
  return [
    rootClassName.trim(),
    ...modifiers.filter(c => typeof c === 'string' && c.trim() !== '').map(c => '-' + (c as string).trim()),
  ].join(' ');
}

export default abemClasses;
