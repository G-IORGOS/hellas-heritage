import UIKit
import Capacitor

class ViewController: CAPBridgeViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // ── Disable bounce / rubber-band effect ──────────────────
        webView?.scrollView.bounces = false
        webView?.scrollView.alwaysBounceVertical = false
        webView?.scrollView.alwaysBounceHorizontal = false
        webView?.scrollView.overScrollMode = .never

        // ── Disable horizontal overscroll ────────────────────────
        webView?.scrollView.contentInsetAdjustmentBehavior = .never

        // ── Disable swipe-back gesture (αριστερά → δεξιά) ───────
        navigationController?.interactivePopGestureRecognizer?.isEnabled = false

        // ── Full screen, no gaps ─────────────────────────────────
        edgesForExtendedLayout = .all
        extendedLayoutIncludesOpaqueBars = true
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)

        // Extra safety: disable bounce after view appears
        webView?.scrollView.bounces = false
        webView?.scrollView.alwaysBounceVertical = false
        webView?.scrollView.alwaysBounceHorizontal = false
    }
}
