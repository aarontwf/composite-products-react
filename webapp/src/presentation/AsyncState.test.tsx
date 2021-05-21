import { AsyncState } from './AsyncState';

test('Success data stored in class', () => {
    const state = AsyncState.success('hello');
    expect(state.data).toBe('hello');
});

test('Fail data stored in class', () => {
    const state = AsyncState.fail('my error');
    expect(state.error).toBe('my error');
});

test('When uninitialized', () => {
    const output = AsyncState.uninitialized().when({
        uninitialized: () => 'uninit',
        loading: () => 'loading',
        success: (data) => data,
        fail: (error) => error
    });

    expect(output).toBe('uninit');
});

test('When loading', () => {
    const output = AsyncState.loading().when({
        uninitialized: () => 'uninit',
        loading: () => 'loading',
        success: (data) => data,
        fail: (error) => error
    });

    expect(output).toBe('loading');
});

test('When success', () => {
    const output = AsyncState.success('hello').when({
        uninitialized: () => 'uninit',
        loading: () => 'loading',
        success: (data) => data,
        fail: (error) => error
    });

    expect(output).toBe('hello');
});

test('When fail', () => {
    const output = AsyncState.fail('my error').when({
        uninitialized: () => 'uninit',
        loading: () => 'loading',
        success: (data) => data,
        fail: (error) => error
    });

    expect(output).toBe('my error');
});

test('Maybe when none', () => {
    const trial = (state: AsyncState<string>) => state.maybeWhen({
        orElse: () => 'orElse',
    });

    expect(trial(AsyncState.uninitialized())).toBe('orElse');
    expect(trial(AsyncState.loading())).toBe('orElse');
    expect(trial(AsyncState.success('done'))).toBe('orElse');
    expect(trial(AsyncState.fail('error'))).toBe('orElse');
});

test('Maybe when all', () => {
    const trial = (state: AsyncState<string>) => state.maybeWhen({
        uninitialized: () => 'uninit',
        loading: () => 'loading',
        success: () => 'success',
        fail: () => 'fail',
        orElse: () => 'orElse',
    });

    expect(trial(AsyncState.uninitialized())).toBe('uninit');
    expect(trial(AsyncState.loading())).toBe('loading');
    expect(trial(AsyncState.success('done'))).toBe('success');
    expect(trial(AsyncState.fail('error'))).toBe('fail');
});

test('Maybe when uninitialized', () => {
    const trial = (state: AsyncState<string>) => state.maybeWhen({
        uninitialized: () => 'uninit',
        orElse: () => 'orElse',
    });

    expect(trial(AsyncState.uninitialized())).toBe('uninit');
    expect(trial(AsyncState.loading())).toBe('orElse');
    expect(trial(AsyncState.success('done'))).toBe('orElse');
    expect(trial(AsyncState.fail('error'))).toBe('orElse');
});

test('Maybe when loading', () => {
    const trial = (state: AsyncState<string>) => state.maybeWhen({
        loading: () => 'loading',
        orElse: () => 'orElse',
    });

    expect(trial(AsyncState.uninitialized())).toBe('orElse');
    expect(trial(AsyncState.loading())).toBe('loading');
    expect(trial(AsyncState.success('done'))).toBe('orElse');
    expect(trial(AsyncState.fail('error'))).toBe('orElse');
});

test('Maybe when succues', () => {
    const trial = (state: AsyncState<string>) => state.maybeWhen({
        success: (data) => data,
        orElse: () => 'orElse',
    });

    expect(trial(AsyncState.uninitialized())).toBe('orElse');
    expect(trial(AsyncState.loading())).toBe('orElse');
    expect(trial(AsyncState.success('done'))).toBe('done');
    expect(trial(AsyncState.fail('error'))).toBe('orElse');
});

test('Maybe when fail', () => {
    const trial = (state: AsyncState<string>) => state.maybeWhen({
        fail: () => 'fail',
        orElse: () => 'orElse',
    });

    expect(trial(AsyncState.uninitialized())).toBe('orElse');
    expect(trial(AsyncState.loading())).toBe('orElse');
    expect(trial(AsyncState.success('done'))).toBe('orElse');
    expect(trial(AsyncState.fail('error'))).toBe('fail');
});
