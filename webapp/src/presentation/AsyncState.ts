import {immerable} from 'immer'

type WhenStates<T, R> = {
    uninitialized: () => R;
    loading: () => R;
    success: (data: T) => R;
    fail: (error: any) => R;
}

type WhenStatesOrElse<T, R> = {
    uninitialized?: () => R;
    loading?: () => R;
    success?: (data: T) => R;
    fail?: (error: any) => R;
    orElse: () => R;
}

abstract class AsyncState<T> {
    [immerable] = true

    static uninitialized<T>(): Uninitialized<T> {
        return new Uninitialized<T>();
    }

    static loading<T>(): Loading<T> {
        return new Loading<T>();
    }

    static success<T>(data: T): Success<T> {
        return new Success<T>(data);
    }

    static fail<T>(error: any): Fail<T> {
        return new Fail<T>(error);
    }

    abstract when<R>(callbacks: WhenStates<T, R>): R;
    abstract maybeWhen<R>(callbacks: WhenStatesOrElse<T, R>): R;
}

class Uninitialized<T> extends AsyncState<T> {
    when<R>(states: WhenStates<T, R>): R {
        return states.uninitialized();
    }

    maybeWhen<R>(states: WhenStatesOrElse<T, R>): R {
        return states.uninitialized ? states.uninitialized() : states.orElse();
    }
}

class Loading<T> extends AsyncState<T> {
    when<R>(states: WhenStates<T, R>): R {
        return states.loading();
    }

    maybeWhen<R>(states: WhenStatesOrElse<T, R>): R {
        return states.loading ? states.loading() : states.orElse();
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
    
    maybeWhen<R>(states: WhenStatesOrElse<T, R>): R {
        return states.success ? states.success(this.data) : states.orElse();
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

    maybeWhen<R>(states: WhenStatesOrElse<T, R>): R {
        return states.fail ? states.fail(this.error) : states.orElse();
    }
}

export {
    AsyncState,
    Uninitialized,
    Loading,
    Success,
    Fail
};
