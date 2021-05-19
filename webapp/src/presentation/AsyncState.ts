type WhenStates<T, R> = {
    uninitialized: () => R;
    loading: () => R;
    success: (data: T) => R;
    fail: (error: any) => R;
}

abstract class AsyncState<T> {
    static uninitialized<T>(): Uninitialized<T> {
        return new Uninitialized<T>();
    }

    static loading<T>(): Loading<T> {
        return new Loading<T>();
    }

    static success<T>(data: T): Success<T> {
        return new Success<T>(data = data);
    }

    static fail<T>(error: any): Fail<T> {
        return new Fail<T>(error = error);
    }

    abstract when<R>(callbacks: WhenStates<T, R>): void;
}

class Uninitialized<T> extends AsyncState<T> {
    when<R>(states: WhenStates<T, R>): R {
        return states.uninitialized();
    }
}

class Loading<T> extends AsyncState<T> {
    when<R>(states: WhenStates<T, R>): R {
        return states.loading();
    }
}

class Success<T> extends AsyncState<T> {
    readonly data: T;

    constructor(data: T) {
        super();
        this.data = data;
    }

    when<R>(states: WhenStates<T, R>): R {
        return states.success(this.data);
    }
}

class Fail<T> extends AsyncState<T> {
    readonly error: any;

    constructor(error: any) {
        super();
        this.error = error;
    }

    when<R>(states: WhenStates<T, R>): R {
        return states.fail(this.error);
    }
}

export {
    AsyncState,
    Uninitialized,
    Loading,
    Success,
    Fail
};
