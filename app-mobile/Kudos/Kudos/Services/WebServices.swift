//
//  WebServices.swift
//  OpenSeasme
//
//  Created by Anargha Jagadeesh on 28/09/21.
//

import Foundation

import UIKit

open class WebServiceApi: NSObject {
    
    class func performRequestWithURL(url :String, dict : NSMutableDictionary, completion:@escaping (_ responseData : AnyObject)-> Void){
        
        // print("current URL \(url)")
        let urlString : String = url.trimmingCharacters(in: .whitespacesAndNewlines)
        DispatchQueue.global(qos: .userInitiated).async {
            
            if let currentUrl: URL = URL.init(string: urlString){
                
                let request = NSMutableURLRequest(url : currentUrl)
                
                //initilise request
                request.addValue("application/json", forHTTPHeaderField: "Content-Type")
//                if let token = AppAccess.shared.token {
//                   request.setValue(token, forHTTPHeaderField: "X-Oc-Merchant-Id")
//                }
//                if let session = AppAccess.shared.session {
//                    request.setValue(session, forHTTPHeaderField: "X-Oc-Session")
//                }
                
                request.httpMethod = "POST";
                //                print("request dictionary \(dict)")
              
                    let postData = try! JSONSerialization.data(withJSONObject: dict, options: [])
                    
                    request.httpBody = postData

                
                let task = URLSession.shared.dataTask(with: request as URLRequest, completionHandler: { data, response, error in
                    
                     
                    guard error == nil && data != nil else{
                        
                        completion(data as AnyObject)
                         print("Error found \(String(describing: error))")
                        return
                    }
                    DispatchQueue.main.async {
                        
                        completion(data! as AnyObject)
                        
                    }
                    
                })
                
                task.resume()
            }
            
        }
    }
    
    class func performRequestWithURLGET(url :String, completion:@escaping (_ responseData : AnyObject)-> Void){
        
        DispatchQueue.global(qos: .userInitiated).async {
            
            if let currentUrl: URL = URL.init(string: url){
                
                let request = NSMutableURLRequest(url : currentUrl)
                
                request.addValue("application/json; charset=utf-8", forHTTPHeaderField: "Content-Type")
                request.httpMethod = "GET";
                
//                if let token = AppAccess.shared.token {
//                   request.setValue(token, forHTTPHeaderField: "X-Oc-Merchant-Id")
//                }
//                if let session = AppAccess.shared.session {
//                    request.setValue(session, forHTTPHeaderField: "X-Oc-Session")
//                }
                
                let task = URLSession.shared.dataTask(with: request as URLRequest, completionHandler: { data, response, error in
                    
                    guard error == nil && data != nil else{
                        
                        completion(data as AnyObject)
                        //                        print("Error found \(String(describing: error))")
                        return
                    }
                    
                    DispatchQueue.main.async {
                        
                        completion(data! as AnyObject)
                        
                    }
                    
                })
                
                task.resume()
            }
            
        }
        
        
    }
    
    class func performRequestWithURLPUT(url :String, dict : NSMutableDictionary, completion:@escaping (_ responseData : AnyObject)-> Void){
        
        // print("current URL \(url)")
        let urlString : String = url.trimmingCharacters(in: .whitespacesAndNewlines)
        DispatchQueue.global(qos: .userInitiated).async {
            
            if let currentUrl: URL = URL.init(string: urlString){
                
                let request = NSMutableURLRequest(url : currentUrl)
                
                //initilise request
                request.addValue("application/json", forHTTPHeaderField: "Content-Type")
//                if let token = AppAccess.shared.token {
//                   request.setValue(token, forHTTPHeaderField: "X-Oc-Merchant-Id")
//                }
//                if let session = AppAccess.shared.session {
//                    request.setValue(session, forHTTPHeaderField: "X-Oc-Session")
//                }
//                
                request.httpMethod = "PUT";
                //                print("request dictionary \(dict)")
              
                    let postData = try! JSONSerialization.data(withJSONObject: dict, options: [])
                    
                    request.httpBody = postData

                
                let task = URLSession.shared.dataTask(with: request as URLRequest, completionHandler: { data, response, error in
                    
                     
                    guard error == nil && data != nil else{
                        
                        completion(data as AnyObject)
                        // print("Error found \(String(describing: error))")
                        return
                    }
                    DispatchQueue.main.async {
                        
                        completion(data! as AnyObject)
                        
                    }
                    
                })
                
                task.resume()
            }
            
        }
    }
    class func performRequestWithURLDELETE(url :String, completion:@escaping (_ responseData : AnyObject)-> Void){
        
        // print("current URL \(url)")
        let urlString : String = url.trimmingCharacters(in: .whitespacesAndNewlines)
        DispatchQueue.global(qos: .userInitiated).async {
            
            if let currentUrl: URL = URL.init(string: urlString){
                
                let request = NSMutableURLRequest(url : currentUrl)
                
                //initilise request
                request.addValue("application/json", forHTTPHeaderField: "Content-Type")
//                if let token = AppAccess.shared.token {
//                   request.setValue(token, forHTTPHeaderField: "X-Oc-Merchant-Id")
//                }
//                if let session = AppAccess.shared.session {
//                    request.setValue(session, forHTTPHeaderField: "X-Oc-Session")
//                }
                
                request.httpMethod = "DELETE";
                //                print("request dictionary \(dict)")

                
                let task = URLSession.shared.dataTask(with: request as URLRequest, completionHandler: { data, response, error in
                    
                     
                    guard error == nil && data != nil else{
                        
                        completion(data as AnyObject)
                        // print("Error found \(String(describing: error))")
                        return
                    }
                    DispatchQueue.main.async {
                        
                        completion(data! as AnyObject)
                        
                    }
                    
                })
                
                task.resume()
            }
            
        }
    }
    
}
