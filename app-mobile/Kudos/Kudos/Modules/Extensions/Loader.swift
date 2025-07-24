//
//  Loader.swift
//  Kudos
//
//  Created by Anargha Jagadeesh on 24/07/25.
//


import UIKit
import NVActivityIndicatorView

final class Loader {
    
    // Singleton instance
    static let shared = Loader()
    
    private var activityIndicator: NVActivityIndicatorView?
    private var containerView: UIView?

    private init() {}

    func show(on view: UIView, type: NVActivityIndicatorType = .ballClipRotate, color: UIColor = .gray) {
        // Avoid duplicate loaders
        if activityIndicator?.isAnimating == true { return }

        let size: CGFloat = 50

        // Dimmed background view
        let container = UIView(frame: view.bounds)
        container.backgroundColor = UIColor(white: 0, alpha: 0.2)

        // Spinner
        let indicator = NVActivityIndicatorView(
            frame: CGRect(x: 0, y: 0, width: size, height: size),
            type: type,
            color: UIColor(hex: "#6554EF", alpha: 1),
            padding: 0
        )
        indicator.center = container.center

        container.addSubview(indicator)
        view.addSubview(container)

        activityIndicator = indicator
        containerView = container

        indicator.startAnimating()
    }

    func hide() {
        activityIndicator?.stopAnimating()
        containerView?.removeFromSuperview()
        activityIndicator = nil
        containerView = nil
    }
}
