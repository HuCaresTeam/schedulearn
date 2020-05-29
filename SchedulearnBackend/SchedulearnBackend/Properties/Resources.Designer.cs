﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SchedulearnBackend.Properties {
    using System;
    
    
    /// <summary>
    ///   A strongly-typed resource class, for looking up localized strings, etc.
    /// </summary>
    // This class was auto-generated by the StronglyTypedResourceBuilder
    // class via a tool like ResGen or Visual Studio.
    // To add or remove a member, edit your .ResX file then rerun ResGen
    // with the /str option, or rebuild your VS project.
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("System.Resources.Tools.StronglyTypedResourceBuilder", "16.0.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    internal class Resources {
        
        private static global::System.Resources.ResourceManager resourceMan;
        
        private static global::System.Globalization.CultureInfo resourceCulture;
        
        [global::System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode")]
        internal Resources() {
        }
        
        /// <summary>
        ///   Returns the cached ResourceManager instance used by this class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        internal static global::System.Resources.ResourceManager ResourceManager {
            get {
                if (object.ReferenceEquals(resourceMan, null)) {
                    global::System.Resources.ResourceManager temp = new global::System.Resources.ResourceManager("SchedulearnBackend.Properties.Resources", typeof(Resources).Assembly);
                    resourceMan = temp;
                }
                return resourceMan;
            }
        }
        
        /// <summary>
        ///   Overrides the current thread's CurrentUICulture property for all
        ///   resource lookups using this strongly typed resource class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        internal static global::System.Globalization.CultureInfo Culture {
            get {
                return resourceCulture;
            }
            set {
                resourceCulture = value;
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Hi {0},&lt;br/&gt;Your manager {1} asked You to join his/her team in Schedulearn app.&lt;br/&gt;Please complete the registration here: &lt;a href=&quot;{2}&quot;&gt;Registration to Schedulearn&lt;/a&gt;.
        /// </summary>
        internal static string Email_BodyText {
            get {
                return ResourceManager.GetString("Email_BodyText", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Registration to Schedulearn.
        /// </summary>
        internal static string Email_SubjectText {
            get {
                return ResourceManager.GetString("Email_SubjectText", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to The record was already edited.
        /// </summary>
        internal static string Error_ConcurrencyException {
            get {
                return ResourceManager.GetString("Error_ConcurrencyException", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Error sending email to {0}.
        /// </summary>
        internal static string Error_EmailNotSent {
            get {
                return ResourceManager.GetString("Error_EmailNotSent", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Learning day with id ({0}) does not exist..
        /// </summary>
        internal static string Error_LearningDayNotFound {
            get {
                return ResourceManager.GetString("Error_LearningDayNotFound", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Consecutive learning days limit already used.
        /// </summary>
        internal static string Error_LimitOfConsecutiveLearningDays {
            get {
                return ResourceManager.GetString("Error_LimitOfConsecutiveLearningDays", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Learning days per month limit already used.
        /// </summary>
        internal static string Error_LimitOfLearningDaysPerMonth {
            get {
                return ResourceManager.GetString("Error_LimitOfLearningDaysPerMonth", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Learning days per quarter limit already used.
        /// </summary>
        internal static string Error_LimitOfLearningDaysPerQuarter {
            get {
                return ResourceManager.GetString("Error_LimitOfLearningDaysPerQuarter", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Learning days per year limit already used.
        /// </summary>
        internal static string Error_LimitOfLearningDaysPerYear {
            get {
                return ResourceManager.GetString("Error_LimitOfLearningDaysPerYear", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Topic with id ({0}) does not exist.
        /// </summary>
        internal static string Error_TopicNotFound {
            get {
                return ResourceManager.GetString("Error_TopicNotFound", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to User with id ({0}) does not exist.
        /// </summary>
        internal static string Error_UserNotFound {
            get {
                return ResourceManager.GetString("Error_UserNotFound", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to User cannot be assigned to a team he/she already manages..
        /// </summary>
        internal static string Error_UserTransferManagerError {
            get {
                return ResourceManager.GetString("Error_UserTransferManagerError", resourceCulture);
            }
        }
    }
}
