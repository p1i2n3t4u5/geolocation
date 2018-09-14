describe("A spy, when configured to fake a series of return values", function() {
    var foo, bar;

    beforeEach(function() {
        foo = {
            setBar: function(value) {
                bar = value;
            },
            getBar: function() {
                return bar;
            }
        };

        spyOn(foo, "getBar").and.returnValues("fetched first", "fetched second");

        foo.setBar(123);
    });

    it("tracks that the spy was called", function() {
        foo.getBar(123);
        expect(foo.getBar).toHaveBeenCalled();
    });

    it("should not affect other functions", function() {
        expect(bar).toEqual(123);
    });

    it("when called multiple times returns the requested values in order", function() {
        expect(foo.getBar()).toEqual("fetched first");
        expect(foo.getBar()).toEqual("fetched second");
        expect(foo.getBar()).toBeUndefined();
    });
});






describe("A spy, when configured with an alternate implementation", function() {
    var foo, bar, fetchedBar;

    beforeEach(function() {
        foo = {
            setBar: function(value) {
                bar = value;
            },
            getBar: function() {
                return bar;
            }
        };


        spyOn(foo, "getBar").and.callFake(function(arguments, can, be, received) {
            return 1001;
        });

        foo.setBar(123);
        fetchedBar = foo.getBar();
    });

    it("tracks that the spy was called", function() {
        expect(foo.getBar).toHaveBeenCalled();
    });

    it("should not affect other functions", function() {
        expect(bar).toEqual(123);
    });

    it("when called returns the requested value", function() {
        expect(fetchedBar).toEqual(1001);
    });
});








describe("A spy, when configured to throw an error", function() {
    var foo, bar;

    beforeEach(function() {
        foo = {
            setBar: function(value) {
                bar = value;
            }
        };

        spyOn(foo, "setBar").and.throwError("quux");
    });

    it("throws the value", function() {
        expect(function() {
            foo.setBar(123)
        }).toThrowError("quux");
    });
});