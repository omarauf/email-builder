import { Decoration, EditorView, StateField, StateEffect } from '@uiw/react-codemirror';
import _ from 'lodash';
// import { StateField, StateEffect } from "@codemirror/state";
// import { EditorView, Decoration } from "@codemirror/view";

/**
 * Plugin that makes line wrapping in the editor respect the identation of the line.
 * It does this by adding a line decoration that adds padding-left (as much as there is indentation),
 * and adds the same amount as negative "text-indent". The nice thing about text-indent is that it
 * applies to the initial line of a wrapped line.
 *
 * The identation decorations have to happen in a StateField (without access to the editor),
 * because they change the layout of the text :( The character width I need however, is in the editor...
 * So I do this ugly hack where I, in `character_width_listener`, I fire an effect that gets picked up
 * by another StateField (`extra_cycle_character_width`) that saves the character width into state,
 * so THEN I can add the markers in the decorations statefield.
 */

/** @type {any} */
const CharacterWidthEffect = StateEffect.define({});
const extraCycleCharacterWidth = StateField.define({
  create() {
    return null;
  },
  update(value, tr) {
    // eslint-disable-next-line no-restricted-syntax
    for (const effect of tr.effects) {
      if (effect.is(CharacterWidthEffect)) return effect.value;
    }
    return value;
  },
});

const characterWidthListener = EditorView.updateListener.of((viewupdate) => {
  const width = viewupdate.view.defaultCharacterWidth;
  let currentWidth = viewupdate.view.state.field(extraCycleCharacterWidth, false);

  // @ts-ignore
  if (currentWidth !== width) {
    // @ts-ignore
    currentWidth = width;
    viewupdate.view.dispatch({
      // @ts-ignore
      effects: [CharacterWidthEffect.of(currentWidth)],
    });
  }
});

const ARBITRARY_INDENT_LINE_WRAP_LIMIT = 48;
const lineWrappingDecorations = StateField.define({
  create() {
    return Decoration.none;
  },
  update(deco, tr) {
    const { tabSize } = tr.state;
    const charWidth = tr.state.field(extraCycleCharacterWidth, false);
    if (charWidth == null) return Decoration.none;

    if (!tr.docChanged && deco !== Decoration.none) return deco;

    const decorations = [];

    // TODO? Only apply to visible lines? Wouldn't that screw stuff up??
    // TODO? Don't create new decorations when a line hasn't changed?
    // @ts-ignore
    // eslint-disable-next-line no-restricted-syntax
    for (const i of _.range(0, tr.state.doc.lines)) {
      const line = tr.state.doc.line(i + 1);
      // eslint-disable-next-line no-continue
      if (line.length === 0) continue;

      let indentedChars = 0;
      // eslint-disable-next-line no-restricted-syntax
      for (const ch of line.text) {
        if (ch === '\t') {
          indentedChars += tabSize;
        } else if (ch === ' ') {
          indentedChars += 1;
        } else {
          break;
        }
      }

      // let tabs_in_front = Math.min(line.text.match(/^\t*/)[0].length) * tabSize
      const offset = Math.min(indentedChars, ARBITRARY_INDENT_LINE_WRAP_LIMIT) * charWidth;

      // TODO? Cache the CSSStyleDeclaration?
      const rules = document.createElement('span').style;
      rules.setProperty('--idented', `${offset}px`);
      rules.setProperty('text-indent', 'calc(-1 * var(--idented) - 1px)'); // I have no idea why, but without the - 1px it behaves weirdly periodically
      rules.setProperty('padding-left', 'calc(var(--idented) + var(--cm-left-padding, 4px))');

      const linerwapper = Decoration.line({
        attributes: { style: rules.cssText },
      });

      decorations.push(linerwapper.range(line.from, line.from));
    }
    return Decoration.set(decorations, true);
  },
  provide: (f) => EditorView.decorations.from(f),
});

export const awesomeLineWrappingPlugin = [
  extraCycleCharacterWidth,
  characterWidthListener,
  lineWrappingDecorations,
];
