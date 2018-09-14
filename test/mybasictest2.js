describe("A spec using the fail function", function() {
    var foo = function(x, callBack) {
        if (x) {
            callBack();
        }
    };

    it("should not call the callBack", function() {
        foo(false, function() {
            fail("Callback has been called");
        });
    });
});



describe("A spec", function() {
    it("is just a function, so it can contain any code", function() {
        var foo = 0;
        foo += 1;

        expect(foo).toEqual(1);
    });

    it("can have more than one expectation", function() {
        var foo = 0;
        foo += 1;

        expect(foo).toEqual(1);
        expect(true).toEqual(true);
    });
});


describe("A spec using beforeEach and afterEach", function() {
    var foo = 0;

    beforeEach(function() {
        foo += 1;
    });

    afterEach(function() {
        foo = 0;
    });

    it("is just a function, so it can contain any code", function() {
        expect(foo).toEqual(1);
    });

    it("can have more than one expectation", function() {
        expect(foo).toEqual(1);
        expect(true).toEqual(true);
    });
});


describe("A spec using beforeAll and afterAll", function() {
    var foo;

    beforeAll(function() {
        foo = 1;
    });

    afterAll(function() {
        foo = 0;
    });

    it("sets the initial value of foo before specs run", function() {
        expect(foo).toEqual(1);
        foo += 1;
    });

    it("does not reset foo between specs", function() {
        expect(foo).toEqual(2);
    });
});




describe("A spec", function() {
    beforeEach(function() {
        this.foo = 0;
    });

    it("can use the `this` to share state", function() {
        expect(this.foo).toEqual(0);
        this.bar = "test pollution?";
    });

    it("prevents test pollution by having an empty `this` created for the next spec", function() {
        expect(this.foo).toEqual(0);
        expect(this.bar).toBe(undefined);
    });
});



describe("A spec", function() {
    var foo;

    beforeEach(function() {
        foo = 0;
        foo += 1;
    });

    afterEach(function() {
        foo = 0;
    });

    it("is just a function, so it can contain any code", function() {
        expect(foo).toEqual(1);
    });

    it("can have more than one expectation", function() {
        expect(foo).toEqual(1);
        expect(true).toEqual(true);
    });

    describe("nested inside a second describe", function() {
        var bar;

        beforeEach(function() {
            bar = 1;
        });

        it("can reference both scopes as needed", function() {
            expect(foo).toEqual(bar);
        });
    });
});