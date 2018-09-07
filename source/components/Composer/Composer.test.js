import React from "react";
import { mount, render } from "enzyme";

import { Composer } from "./";

const avatar = "https://www.avatar.com";
const currentUserFirstName = "Sana";

const props = {
    _createPost: jest.fn(),
    currentUserFirstName,
    avatar,
};

const comment = "Merry Christmas";
const initialState = {
    comment: "",
};
const updateState = {
    comment,
};

const result = mount(<Composer { ...props } />);
const markup = render(<Composer { ...props } />);

let _submitCommentSpy = jest.spyOn(result.instance(), "_submitComment");
let _handleFormSubmitSpy = jest.spyOn(result.instance(), "_handlerFormSubmit");
let _submitOnEnterSpy = jest.spyOn(result.instance(), "_submitOnEnter");

describe("Composer component: ", () => {
    beforeEach(() => {
        _submitCommentSpy = jest.spyOn(result.instance(), "_submitComment");
        _handleFormSubmitSpy = jest.spyOn(
            result.instance(),
            "_handlerFormSubmit"
        );
        _submitOnEnterSpy = jest.spyOn(result.instance(), "_submitOnEnter");
    });

    afterEach(() => {
        _submitCommentSpy.mockClear();
        _handleFormSubmitSpy.mockClear();
        _submitOnEnterSpy.mockClear();
    });

    test("should have 1 <<section>> element", () => {
        expect(result.find("section")).toHaveLength(1);
    });

    test("should have 1 <<form>> element", () => {
        expect(result.find("form")).toHaveLength(1);
    });

    test("should have 1 <<textarea>> element", () => {
        expect(result.find("textarea")).toHaveLength(1);
    });

    test("should have 1 <<input>> element", () => {
        expect(result.find("input")).toHaveLength(1);
    });

    test("should have 1 <<img>> element", () => {
        expect(result.find("img")).toHaveLength(1);
    });

    test("should have valid initial state", () => {
        expect(result.state()).toEqual(initialState);
    });

    test("textarea value should be empty initially", () => {
        expect(result.find("textarea").text()).toBe("");
    });

    test("should respond to state change properly", () => {
        result.setState({
            comment,
        });
        expect(result.state()).toEqual(updateState);
        expect(result.find("textarea").text()).toBe(comment);

        result.setState({
            comment: "",
        });

        expect(result.state()).toEqual(initialState);
        expect(result.find("textarea").text()).toBe("");
    });

    test("should handle textarea change event", () => {
        result.find("textarea").simulate("change", {
            target: {
                value: comment,
            },
        });
        expect(result.state()).toEqual(updateState);
        expect(result.find("textarea").text()).toBe(comment);
    });

    test("should handle textarea submit event", () => {
        result.find("form").simulate("submit");

        expect(result.state()).toEqual(initialState);
    });

    test("_createPost prop should be invoked once after form submission", () => {
        expect(props._createPost).toHaveBeenCalledTimes(1);
    });

    test("_submitComment and _handleFormSubmit class methods should be invoked one after form is submitted", () => {
        result.find("form").simulate("submit");
        expect(_submitCommentSpy).toHaveBeenCalledTimes(1);
        expect(_handleFormSubmitSpy).toHaveBeenCalledTimes(1);
    });

    test("_submitOnEnterSpy class method should be invoked once after form is submitted on Enter", () => {
        result.find("textarea").simulate("keyPress", { key: "Enter" });
        expect(_submitOnEnterSpy).toHaveBeenCalledTimes(1);
        expect(_submitCommentSpy).toHaveBeenCalledTimes(1);
    });

    test("should respond to textarea placeholder properly", () => {
        expect(markup.find("textarea").attr("placeholder")).toEqual(
            `What's on your mind, ${props.currentUserFirstName}?`
        );
    });

    test("should respond to img src properly", () => {
        expect(markup.find("img").attr("src")).toBe(props.avatar);
    });

    test("should return null, if no comment", () => {
        expect(_submitCommentSpy(!comment)).toBeNull();
    });
});
