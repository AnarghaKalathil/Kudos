//
//  UIImageExtension.swift
//  Kudos
//
//  Created by Anargha Jagadeesh on 24/07/25.
//
import UIKit

extension UIImage {
    static func gif(name: String) -> UIImage? {
        guard let path = Bundle.main.path(forResource: name, ofType: "gif") else {
            return nil
        }
        let url = URL(fileURLWithPath: path)
        guard let data = try? Data(contentsOf: url) else {
            return nil
        }
        return gif(data: data)
    }

    static func gif(data: Data) -> UIImage? {
        guard let source = CGImageSourceCreateWithData(data as CFData, nil) else { return nil }

        let count = CGImageSourceGetCount(source)
        var images = [UIImage]()
        var duration: TimeInterval = 0

        for i in 0..<count {
            if let cgImage = CGImageSourceCreateImageAtIndex(source, i, nil) {
                images.append(UIImage(cgImage: cgImage))
            }
            if let properties = CGImageSourceCopyPropertiesAtIndex(source, i, nil) as Dictionary? {
                if let gifProperties = properties[kCGImagePropertyGIFDictionary] as? [String: Any],
                   let delayTime = gifProperties[kCGImagePropertyGIFDelayTime as String] as? NSNumber {
                    duration += delayTime.doubleValue
                }
            }
        }

        return UIImage.animatedImage(with: images, duration: duration)
    }
}
