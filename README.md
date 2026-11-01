# SortLab — Motion Lab

A redesigned Django sorting visualizer with an original cinematic dark interface inspired by the visual atmosphere and motion language of Google Antigravity.

## Interaction
- Smooth custom cursor dot/ring on pointer devices
- Cursor-following radial spotlight
- Pointer-reactive card tilt
- Magnetic CTA buttons
- Scroll reveal and subtle hero parallax
- Touch-friendly fallback (custom cursor effects are disabled on touch)

## Sorting lab
Bubble, Selection, Insertion, Merge, Quick, Heap, Shell and Counting Sort.
Manual input, random arrays, step, play, pause, reset, instant sort, metrics and two-algorithm comparison.

## Run locally
```bash
py -m venv .venv
.venv\\Scripts\\activate
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
Open http://127.0.0.1:8000/

## Deploy on Render
- Build command: `./build.sh`
- Start command: `gunicorn sortx_site.wsgi:application`
- Set `SECRET_KEY`, `DEBUG=False`, and `ALLOWED_HOSTS` in environment variables.
- Set `CSRF_TRUSTED_ORIGINS` to your HTTPS deployment URL if needed.

The cursor tracking is client-side JavaScript using pointer events and CSS transforms; it does not record or transmit cursor data.


## Visual redesign
The landing page now uses an editorial layout: a split hero, typographic manifesto, numbered process timeline, horizontal algorithm index, contrasting lime complexity panel, and a dedicated sorting workbench. Branding is SortLab throughout. Cursor spotlight, smooth follower, magnetic controls, tilt, and scroll reveals remain client-side.


## Separate About page
The About section is a dedicated Django page at `/about/`. The homepage navigation links to this route, and the About page links back to the sorting lab using `/#lab`.
