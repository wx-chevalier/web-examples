// https://v8docs.nodesource.com/node-7.2/d4/da0/v8_8h_source.html#l02660
class V8_EXPORT Object : public Value {
  public:
   V8_DEPRECATE_SOON("Use maybe version",
                     bool Set(Local<Value> key, Local<Value> value));
   V8_WARN_UNUSED_RESULT Maybe<bool> Set(Local<Context> context,
                                         Local<Value> key, Local<Value> value);
 
   V8_DEPRECATE_SOON("Use maybe version",
                     bool Set(uint32_t index, Local<Value> value));
   V8_WARN_UNUSED_RESULT Maybe<bool> Set(Local<Context> context, uint32_t index,
                                         Local<Value> value);
 
   // Implements CreateDataProperty (ECMA-262, 7.3.4).
   //
   // Defines a configurable, writable, enumerable property with the given value
   // on the object unless the property already exists and is not configurable
   // or the object is not extensible.
   //
   // Returns true on success.
   V8_WARN_UNUSED_RESULT Maybe<bool> CreateDataProperty(Local<Context> context,
                                                        Local<Name> key,
                                                        Local<Value> value);
   V8_WARN_UNUSED_RESULT Maybe<bool> CreateDataProperty(Local<Context> context,
                                                        uint32_t index,
                                                        Local<Value> value);
 
   // Implements DefineOwnProperty.
   //
   // In general, CreateDataProperty will be faster, however, does not allow
   // for specifying attributes.
   //
   // Returns true on success.
   V8_WARN_UNUSED_RESULT Maybe<bool> DefineOwnProperty(
       Local<Context> context, Local<Name> key, Local<Value> value,
       PropertyAttribute attributes = None);
 
   // Sets an own property on this object bypassing interceptors and
   // overriding accessors or read-only properties.
   //
   // Note that if the object has an interceptor the property will be set
   // locally, but since the interceptor takes precedence the local property
   // will only be returned if the interceptor doesn't return a value.
   //
   // Note also that this only works for named properties.
   V8_DEPRECATED("Use CreateDataProperty / DefineOwnProperty",
                 bool ForceSet(Local<Value> key, Local<Value> value,
                               PropertyAttribute attribs = None));
   V8_DEPRECATE_SOON("Use CreateDataProperty / DefineOwnProperty",
                     Maybe<bool> ForceSet(Local<Context> context,
                                          Local<Value> key, Local<Value> value,
                                          PropertyAttribute attribs = None));
 
   V8_DEPRECATE_SOON("Use maybe version", Local<Value> Get(Local<Value> key));
   V8_WARN_UNUSED_RESULT MaybeLocal<Value> Get(Local<Context> context,
                                               Local<Value> key);
 
   V8_DEPRECATE_SOON("Use maybe version", Local<Value> Get(uint32_t index));
   V8_WARN_UNUSED_RESULT MaybeLocal<Value> Get(Local<Context> context,
                                               uint32_t index);
 
   V8_DEPRECATED("Use maybe version",
                 PropertyAttribute GetPropertyAttributes(Local<Value> key));
   V8_WARN_UNUSED_RESULT Maybe<PropertyAttribute> GetPropertyAttributes(
       Local<Context> context, Local<Value> key);
 
   V8_DEPRECATED("Use maybe version",
                 Local<Value> GetOwnPropertyDescriptor(Local<String> key));
   V8_WARN_UNUSED_RESULT MaybeLocal<Value> GetOwnPropertyDescriptor(
       Local<Context> context, Local<String> key);
 
   V8_DEPRECATE_SOON("Use maybe version", bool Has(Local<Value> key));
   V8_WARN_UNUSED_RESULT Maybe<bool> Has(Local<Context> context,
                                         Local<Value> key);
 
   V8_DEPRECATE_SOON("Use maybe version", bool Delete(Local<Value> key));
   // TODO(dcarney): mark V8_WARN_UNUSED_RESULT
   Maybe<bool> Delete(Local<Context> context, Local<Value> key);
 
   V8_DEPRECATED("Use maybe version", bool Has(uint32_t index));
   V8_WARN_UNUSED_RESULT Maybe<bool> Has(Local<Context> context, uint32_t index);
 
   V8_DEPRECATED("Use maybe version", bool Delete(uint32_t index));
   // TODO(dcarney): mark V8_WARN_UNUSED_RESULT
   Maybe<bool> Delete(Local<Context> context, uint32_t index);
 
   V8_DEPRECATED("Use maybe version",
                 bool SetAccessor(Local<String> name,
                                  AccessorGetterCallback getter,
                                  AccessorSetterCallback setter = 0,
                                  Local<Value> data = Local<Value>(),
                                  AccessControl settings = DEFAULT,
                                  PropertyAttribute attribute = None));
   V8_DEPRECATED("Use maybe version",
                 bool SetAccessor(Local<Name> name,
                                  AccessorNameGetterCallback getter,
                                  AccessorNameSetterCallback setter = 0,
                                  Local<Value> data = Local<Value>(),
                                  AccessControl settings = DEFAULT,
                                  PropertyAttribute attribute = None));
   // TODO(dcarney): mark V8_WARN_UNUSED_RESULT
   Maybe<bool> SetAccessor(Local<Context> context, Local<Name> name,
                           AccessorNameGetterCallback getter,
                           AccessorNameSetterCallback setter = 0,
                           MaybeLocal<Value> data = MaybeLocal<Value>(),
                           AccessControl settings = DEFAULT,
                           PropertyAttribute attribute = None);
 
   void SetAccessorProperty(Local<Name> name, Local<Function> getter,
                            Local<Function> setter = Local<Function>(),
                            PropertyAttribute attribute = None,
                            AccessControl settings = DEFAULT);
 
   Maybe<bool> HasPrivate(Local<Context> context, Local<Private> key);
   Maybe<bool> SetPrivate(Local<Context> context, Local<Private> key,
                          Local<Value> value);
   Maybe<bool> DeletePrivate(Local<Context> context, Local<Private> key);
   MaybeLocal<Value> GetPrivate(Local<Context> context, Local<Private> key);
 
   V8_DEPRECATE_SOON("Use maybe version", Local<Array> GetPropertyNames());
   V8_WARN_UNUSED_RESULT MaybeLocal<Array> GetPropertyNames(
       Local<Context> context);
   V8_WARN_UNUSED_RESULT MaybeLocal<Array> GetPropertyNames(
       Local<Context> context, KeyCollectionMode mode,
       PropertyFilter property_filter, IndexFilter index_filter);
 
   V8_DEPRECATE_SOON("Use maybe version", Local<Array> GetOwnPropertyNames());
   V8_WARN_UNUSED_RESULT MaybeLocal<Array> GetOwnPropertyNames(
       Local<Context> context);
 
   V8_WARN_UNUSED_RESULT MaybeLocal<Array> GetOwnPropertyNames(
       Local<Context> context, PropertyFilter filter);
 
   Local<Value> GetPrototype();
 
   V8_DEPRECATED("Use maybe version", bool SetPrototype(Local<Value> prototype));
   V8_WARN_UNUSED_RESULT Maybe<bool> SetPrototype(Local<Context> context,
                                                  Local<Value> prototype);
 
   Local<Object> FindInstanceInPrototypeChain(Local<FunctionTemplate> tmpl);
 
   V8_DEPRECATED("Use maybe version", Local<String> ObjectProtoToString());
   V8_WARN_UNUSED_RESULT MaybeLocal<String> ObjectProtoToString(
       Local<Context> context);
 
   Local<String> GetConstructorName();
 
   Maybe<bool> SetIntegrityLevel(Local<Context> context, IntegrityLevel level);
 
   int InternalFieldCount();
 
   V8_INLINE static int InternalFieldCount(
       const PersistentBase<Object>& object) {
     return object.val_->InternalFieldCount();
   }
 
   V8_INLINE Local<Value> GetInternalField(int index);
 
   void SetInternalField(int index, Local<Value> value);
 
   V8_INLINE void* GetAlignedPointerFromInternalField(int index);
 
   V8_INLINE static void* GetAlignedPointerFromInternalField(
       const PersistentBase<Object>& object, int index) {
     return object.val_->GetAlignedPointerFromInternalField(index);
   }
 
   void SetAlignedPointerInInternalField(int index, void* value);
   void SetAlignedPointerInInternalFields(int argc, int indices[],
                                          void* values[]);
 
   // Testers for local properties.
   V8_DEPRECATED("Use maybe version", bool HasOwnProperty(Local<String> key));
   V8_WARN_UNUSED_RESULT Maybe<bool> HasOwnProperty(Local<Context> context,
                                                    Local<Name> key);
   V8_WARN_UNUSED_RESULT Maybe<bool> HasOwnProperty(Local<Context> context,
                                                    uint32_t index);
   V8_DEPRECATE_SOON("Use maybe version",
                     bool HasRealNamedProperty(Local<String> key));
   V8_WARN_UNUSED_RESULT Maybe<bool> HasRealNamedProperty(Local<Context> context,
                                                          Local<Name> key);
   V8_DEPRECATE_SOON("Use maybe version",
                     bool HasRealIndexedProperty(uint32_t index));
   V8_WARN_UNUSED_RESULT Maybe<bool> HasRealIndexedProperty(
       Local<Context> context, uint32_t index);
   V8_DEPRECATE_SOON("Use maybe version",
                     bool HasRealNamedCallbackProperty(Local<String> key));
   V8_WARN_UNUSED_RESULT Maybe<bool> HasRealNamedCallbackProperty(
       Local<Context> context, Local<Name> key);
 
   V8_DEPRECATED(
       "Use maybe version",
       Local<Value> GetRealNamedPropertyInPrototypeChain(Local<String> key));
   V8_WARN_UNUSED_RESULT MaybeLocal<Value> GetRealNamedPropertyInPrototypeChain(
       Local<Context> context, Local<Name> key);
 
   V8_DEPRECATED(
       "Use maybe version",
       Maybe<PropertyAttribute> GetRealNamedPropertyAttributesInPrototypeChain(
           Local<String> key));
   V8_WARN_UNUSED_RESULT Maybe<PropertyAttribute>
   GetRealNamedPropertyAttributesInPrototypeChain(Local<Context> context,
                                                  Local<Name> key);
 
   V8_DEPRECATED("Use maybe version",
                 Local<Value> GetRealNamedProperty(Local<String> key));
   V8_WARN_UNUSED_RESULT MaybeLocal<Value> GetRealNamedProperty(
       Local<Context> context, Local<Name> key);
 
   V8_DEPRECATED("Use maybe version",
                 Maybe<PropertyAttribute> GetRealNamedPropertyAttributes(
                     Local<String> key));
   V8_WARN_UNUSED_RESULT Maybe<PropertyAttribute> GetRealNamedPropertyAttributes(
       Local<Context> context, Local<Name> key);
 
   bool HasNamedLookupInterceptor();
 
   bool HasIndexedLookupInterceptor();
 
   int GetIdentityHash();
 
   // TODO(dcarney): take an isolate and optionally bail out?
   Local<Object> Clone();
 
   Local<Context> CreationContext();
 
   bool IsCallable();
 
   bool IsConstructor();
 
   V8_DEPRECATED("Use maybe version",
                 Local<Value> CallAsFunction(Local<Value> recv, int argc,
                                             Local<Value> argv[]));
   V8_WARN_UNUSED_RESULT MaybeLocal<Value> CallAsFunction(Local<Context> context,
                                                          Local<Value> recv,
                                                          int argc,
                                                          Local<Value> argv[]);
 
   V8_DEPRECATED("Use maybe version",
                 Local<Value> CallAsConstructor(int argc, Local<Value> argv[]));
   V8_WARN_UNUSED_RESULT MaybeLocal<Value> CallAsConstructor(
       Local<Context> context, int argc, Local<Value> argv[]);
 
   V8_DEPRECATE_SOON("Keep track of isolate correctly", Isolate* GetIsolate());
 
   static Local<Object> New(Isolate* isolate);
 
   V8_INLINE static Object* Cast(Value* obj);
 
  private:
   Object();
   static void CheckCast(Value* obj);
   Local<Value> SlowGetInternalField(int index);
   void* SlowGetAlignedPointerFromInternalField(int index);
 };