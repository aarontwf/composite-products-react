import { AsyncState } from "./AsyncState";

test('Success data stored in class', () => {
    const state = AsyncState.success("hello");
    expect(state.data).toBe("hello");
});

test('Fail data stored in class', () => {
    const state = AsyncState.fail("my error");
    expect(state.error).toBe("my error");
});

test('When uninitialized', () => {
    const output = AsyncState.uninitialized().when({
        uninitialized: () => "uninit",
        loading: () => "loading",
        success: (data) => data,
        fail: (error) => error
    });

    expect(output).toBe("uninit");
});

test('When loading', () => {
    const output = AsyncState.loading().when({
        uninitialized: () => "uninit",
        loading: () => "loading",
        success: (data) => data,
        fail: (error) => error
    });

    expect(output).toBe("loading");
});

test('When success', () => {
    const output = AsyncState.success("hello").when({
        uninitialized: () => "uninit",
        loading: () => "loading",
        success: (data) => data,
        fail: (error) => error
    });

    expect(output).toBe("hello");
});

test('When fail', () => {
    const output = AsyncState.fail("my error").when({
        uninitialized: () => "uninit",
        loading: () => "loading",
        success: (data) => data,
        fail: (error) => error
    });

    expect(output).toBe("my error");
});
