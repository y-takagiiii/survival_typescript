import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SimpleButton } from "./SimpleButton";

test("ボタンをクリックするとON/OFFの表示が切り替わる", async () => {
  const user = userEvent.setup();
  // 1. ボタンを描画する
  render(<SimpleButton />);
  // 2. OFFと表示されていることを確かめる
  const simpleButton = screen.getByRole("button");
  expect(simpleButton).toHaveTextContent("OFF");
  // 3. ボタンをクリックする
  await user.click(simpleButton);
  // 4. ONと表示されていることを確かめる
  expect(simpleButton).toHaveTextContent("ON");
});