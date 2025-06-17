export class Either<TLeft, TRight> {
  private constructor(left: TLeft | null, right: TRight | null) {
    if (left !== null) {
      this.is_left = true;
    }

    if (right !== null) {
      this.is_right = true;
    }

    this.#left = left!;
    this.#right = right!;
  }

  readonly is_left: boolean = false;
  readonly #left: TLeft;
  get left(): TLeft {
    return this.#left;
  }

  readonly is_right: boolean = false;
  readonly #right: TRight;
  get right(): TRight {
    return this.#right;
  }
  
  static left<TLeft, TRight>(value: TLeft): Either<TLeft, TRight> {
    return new Either(value, null!);
  }

  static right<TLeft, TRight>(value: TRight): Either<TLeft, TRight> {
    return new Either(null!, value);
  }
}
