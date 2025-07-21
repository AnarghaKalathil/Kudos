//
//  NetworkModel.swift
//  XpensR
//
//  Created by Anargha Jagadeesh on 04/06/24.
//

import Foundation

public protocol ParameterConvertible: Codable {
    static func objectFrom(json: Any, decoder: JSONDecoder)throws -> Self?
    func toParams()throws -> [String: Any]?
}

public extension ParameterConvertible {
    static func objectFrom(json: Any, decoder: JSONDecoder = JSONDecoder()) throws -> Self? {
        do {
            let data = try JSONSerialization
                .data(
                    withJSONObject: json,
                    options: JSONSerialization.WritingOptions.prettyPrinted)
            decoder.keyDecodingStrategy = .convertFromSnakeCase
            let jsonModel = try decoder.decode(self, from: data)
            return jsonModel
        } catch let error {
            throw error
        }
    }
    func toParams()throws -> [String: Any]? {
        do {
            let encoder = JSONEncoder()
            encoder.keyEncodingStrategy = .convertToSnakeCase
            let data = try encoder.encode(self)
            let dict = try JSONSerialization
                .jsonObject(
                    with: data,
                    options: JSONSerialization.ReadingOptions.mutableContainers) as? [String: Any]
            return dict
        } catch let error {
            throw error
        }
    }
}
