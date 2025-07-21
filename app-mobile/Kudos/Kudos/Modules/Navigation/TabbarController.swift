//
//  TabbarController.swift
//  Kudos
//
//  Created by Anargha Jagadeesh on 17/07/25.
//

import UIKit

class TabbarController: UITabBarController {
    override func viewDidLoad() {
        super.viewDidLoad()
        self.applyShadow()
    }
    
    func applyShadow(
        color: UIColor = .black,
        opacity: Float = 0.1,
        offset: CGSize = CGSize(width: 0, height: -2),
        radius: CGFloat = 8
    ) {
        self.tabBar.layer.shadowColor = color.cgColor
        self.tabBar.layer.shadowOpacity = opacity
        self.tabBar.layer.shadowOffset = offset
        self.tabBar.layer.shadowRadius = radius
        self.tabBar.layer.masksToBounds = false
        self.tabBar.isTranslucent = true
        self.tabBar.backgroundColor = .white // or your desired color
    }
}
