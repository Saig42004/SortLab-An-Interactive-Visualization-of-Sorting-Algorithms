from django.test import TestCase
from django.urls import reverse

class SortLabPageTests(TestCase):
    def test_main_pages_load(self):
        for url in ["home", "workbench", "algorithms", "complexity", "compare", "about"]:
            with self.subTest(url=url):
                self.assertEqual(self.client.get(reverse(url)).status_code, 200)

    def test_all_algorithm_pages_load(self):
        slugs = ["bubble-sort", "selection-sort", "insertion-sort", "merge-sort", "quick-sort", "heap-sort", "shell-sort", "counting-sort"]
        for slug in slugs:
            with self.subTest(slug=slug):
                self.assertEqual(self.client.get(reverse("algorithm_detail", args=[slug])).status_code, 200)

    def test_unknown_algorithm_returns_404(self):
        self.assertEqual(self.client.get("/algorithms/not-real/").status_code, 404)

    def test_health_endpoint(self):
        response = self.client.get(reverse("health"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "ok")
