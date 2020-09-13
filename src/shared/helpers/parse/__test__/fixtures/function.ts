export const fn = (x, y) => x + y;

export const fn2 = (x, y) => x + y, fn3 = () => 1;

export function fn4() { return 1 };

function fn5() { return 1 };

const includeSomeFn = {
  fn6() {
    return 1
  },
  fn7() {
    return 1
  },

  prop: {
    insideFn(){
      return 1
    }
  }
}

export const { fn6, fn7, prop: { insideFn } } = includeSomeFn