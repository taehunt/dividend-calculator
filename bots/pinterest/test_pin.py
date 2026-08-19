from __future__ import annotations

import unittest
from unittest.mock import Mock, patch

from bots.pinterest.pin import build_content, get_client_token


class PinterestPinTests(unittest.TestCase):
    def test_content_uses_current_data_and_tracking(self) -> None:
        content = build_content(
            {
                "score": 47,
                "scoreLabel": {"en": "Neutral"},
                "avgEtfYield": 5.183,
                "spreadVs10y": 0.463,
                "rates": {"dgs10": {"value": 4.72}},
                "history": [
                    {"date": "2026-08-17", "score": 49},
                    {"date": "2026-08-18", "score": 47},
                ],
            }
        )
        self.assertEqual(content.title, "INCOME PULSE 47/100")
        self.assertIn("-2 VS PRIOR READING", content.subtitle)
        self.assertIn("utm_source=pinterest", content.destination)
        self.assertIn("utm_content=2026-08-18", content.destination)
        self.assertIn("not financial advice", content.description)

    @patch("bots.pinterest.pin.requests.post")
    def test_client_token_requires_all_publish_scopes(self, post: Mock) -> None:
        response = Mock(status_code=200)
        response.json.return_value = {
            "access_token": "token-value",
            "scope": "boards:read boards:write pins:read pins:write",
        }
        post.return_value = response

        self.assertEqual(get_client_token("app-id", "app-secret"), "token-value")
        response.raise_for_status.assert_called_once()

    @patch("bots.pinterest.pin.requests.post")
    def test_client_token_rejects_incomplete_scopes(self, post: Mock) -> None:
        response = Mock(status_code=200)
        response.json.return_value = {
            "access_token": "token-value",
            "scope": "boards:read pins:read",
        }
        post.return_value = response

        with self.assertRaisesRegex(RuntimeError, "missing required"):
            get_client_token("app-id", "app-secret")


if __name__ == "__main__":
    unittest.main()
